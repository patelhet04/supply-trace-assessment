from models import companies_df, locations_df

def get_all_companies():
    return companies_df.to_dict(orient='records')

def get_company_by_id(company_id):
    company = companies_df[companies_df['company_id'] == company_id]
    if not company.empty:
        return company.iloc[0].to_dict()
    return None

def get_locations_by_company_id(company_id):
    locations = locations_df[locations_df['company_id'] == company_id]
    return locations.to_dict(orient='records')
