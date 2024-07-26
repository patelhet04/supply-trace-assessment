from flask import Flask, request, jsonify, abort
from flask_restful import Api, Resource, marshal_with, fields
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from werkzeug.exceptions import HTTPException, NotFound
from services import get_all_companies, get_company_by_id, get_locations_by_company_id
from utils import logger, validate_positive_integer

# Initialize Flask app and configure CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

# Set up Swagger UI
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Company Locations API"})
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Define fields for marshalling responses
location_fields = {
    'company_id': fields.Integer,
    'location_id': fields.Integer,
    'address': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float,
    'employees': fields.Integer
}

company_fields = {
    'company_id': fields.Integer,
    'name': fields.String,
    'address': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float
}

# API resource classes
class HelloWorld(Resource):
    def get(self):
        """Simple endpoint to check if the API is running"""
        return {'message': 'Hello, welcome to the Company Locations API!'}

class CompanyList(Resource):
    def get(self):
        """
        Get all companies or search for companies by name
        Query Parameters:
            search (optional): Search term to filter companies by name
        """
        try:
            search_query = request.args.get('search', '').lower()
            companies = get_all_companies()

            if search_query:
                filtered_companies = [
                    company for company in companies
                    if search_query in company['name'].lower()
                ]
            else:
                filtered_companies = companies

            return jsonify(filtered_companies)
        except Exception as e:
            logger.error(f"Error in CompanyList: {str(e)}")
            return {'error': 'An unexpected error occurred'}, 500

class CompanyDetail(Resource):
    @marshal_with(company_fields)
    def get(self, company_id):
        """
        Get details of a specific company
        Args:
            company_id (int): The ID of the company to retrieve
        """
        if not validate_positive_integer(company_id):
            abort(400, description='Company ID must be a positive integer')
        
        try:
            company = get_company_by_id(company_id)
            if company:
                return company
            raise NotFound('Company not found')
        except NotFound as e:
            logger.info(f"Company not found: {str(e)}")
            abort(404, description=str(e))
        except Exception as e:
            logger.error(f"Error in CompanyDetail: {str(e)}")
            abort(500, description='An unexpected error occurred')

class CompanyLocations(Resource):
    @marshal_with(location_fields)
    def get(self, company_id):
        """
        Get all locations for a specific company
        Args:
            company_id (int): The ID of the company to retrieve locations for
        """
        if not validate_positive_integer(company_id):
            abort(400, description='Company ID must be a positive integer')
        
        try:
            locations = get_locations_by_company_id(company_id)
            if locations:
                return locations
            raise NotFound('Company not found')
        except NotFound as e:
            logger.info(f"Company not found: {str(e)}")
            abort(404, description=str(e))
        except Exception as e:
            logger.error(f"Error in CompanyDetail: {str(e)}")
            abort(500, description='An unexpected error occurred')

# Register API resources
api.add_resource(HelloWorld, '/')
api.add_resource(CompanyList, '/companies')
api.add_resource(CompanyDetail, '/company/<int:company_id>')
api.add_resource(CompanyLocations, '/company/<int:company_id>/locations')

@app.errorhandler(Exception)
def handle_exception(e):
    print(f"Global exception handler caught: {type(e).__name__}: {str(e)}")
    if isinstance(e, HTTPException):
        if e.code == 404:
            return jsonify(error="Route not found"), 404
        return jsonify(error=str(e.description)), e.code
    logger.error(f"Unhandled exception: {str(e)}")
    return jsonify(error="An unexpected error occurred"), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
