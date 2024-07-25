from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse,  marshal_with, fields
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from services import get_all_companies, get_company_by_id, get_locations_by_company_id

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL, config={'app_name': "Company Locations API"})
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


# Create a request parser
parser = reqparse.RequestParser()
parser.add_argument('company_id', type=int, help='Company ID must be a positive integer')

location_fields = {
    'company_id': fields.Integer,
    'location_id': fields.Integer,
    'address': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float,
    'employees':fields.Integer
}
company_fields = {
    'company_id': fields.Integer,
    'name': fields.String,
    'address': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float
}

class CompanyList(Resource):
    def get(self):
        try:
            # Get the search query from request arguments
            search_query = request.args.get('search', '').lower()

            # Get all companies
            companies = get_all_companies()

            # If a search query is provided, filter the companies
            if search_query:
                filtered_companies = [
                    company for company in companies
                    if search_query in company['name'].lower()
                ]
            else:
                filtered_companies = companies

            return jsonify(filtered_companies)
        except Exception as e:
            return {'error': str(e)}, 500


class CompanyDetail(Resource):
    @marshal_with(company_fields)
    def get(self, company_id):
        if company_id <= 0:
            return {'error': 'Company ID must be a positive integer'}, 400
        company = get_company_by_id(company_id)
        if company:
            return company
        return {'error': 'Company not found'}, 404

class CompanyLocations(Resource):
    @marshal_with(location_fields)
    def get(self, company_id):
        if company_id <= 0:
            return {'error': 'Company ID must be a positive integer'}, 400
        locations = get_locations_by_company_id(company_id)
        if locations:
            return locations
        return {'error': 'No locations found for this company'}, 404

api.add_resource(CompanyList, '/companies')
api.add_resource(CompanyDetail, '/company/<int:company_id>')
api.add_resource(CompanyLocations, '/company/<int:company_id>/locations')

if __name__ == '__main__':
    app.run(debug=True, port=5001)