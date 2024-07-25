from models import companies_df, locations_df
from utils import logger

def get_all_companies():
    """Retrieve all companies from the dataset"""
    try:
        return companies_df.to_dict(orient='records')
    except Exception as e:
        logger.error(f"Error in get_all_companies: {str(e)}")
        raise

def get_company_by_id(company_id):
    """
    Retrieve a specific company by its ID
    Args:
        company_id (int): The ID of the company to retrieve
    Returns:
        dict: Company details if found, None otherwise
    """
    try:
        company = companies_df[companies_df['company_id'] == company_id]
        if not company.empty:
            return company.iloc[0].to_dict()
        return None
    except Exception as e:
        logger.error(f"Error in get_company_by_id: {str(e)}")
        raise

def get_locations_by_company_id(company_id):
    """
    Retrieve all locations for a specific company
    Args:
        company_id (int): The ID of the company to retrieve locations for
    Returns:
        list: List of location dictionaries
    """
    try:
        locations = locations_df[locations_df['company_id'] == company_id]
        return locations.to_dict(orient='records')
    except Exception as e:
        logger.error(f"Error in get_locations_by_company_id: {str(e)}")
        raise