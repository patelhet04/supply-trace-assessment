import sys
import os
sys.path.insert(0, os.path.abspath(os.path.dirname(os.path.dirname(__file__))))

import pytest
from app import app
from services import get_all_companies, get_company_by_id, get_locations_by_company_id
from unittest.mock import patch

@pytest.fixture
def client():
    """Pytest fixture for creating a test client"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_hello_world(client):
    """Test the hello world endpoint"""
    response = client.get('/')
    assert response.status_code == 200
    assert b'Hello, welcome to the Company Locations API!' in response.data

@patch('app.get_all_companies')
def test_company_list(mock_get_all_companies, client):
    """Test retrieving the list of all companies"""
    # Mock data for companies
    mock_companies = [
        {"company_id": 1, "name": "TechNova Solutions", "address": "123 Innovation Drive, San Francisco, CA 94105", "latitude": 37.7749, "longitude": -122.4194},
        {"company_id": 2, "name": "GreenLeaf Enterprises", "address": "456 Sustainability Ave, Portland, OR 97201", "latitude": 45.5155, "longitude": -122.6789}
    ]
    mock_get_all_companies.return_value = mock_companies

    response = client.get('/companies')
    assert response.status_code == 200
    assert len(response.json) == 2
    assert response.json[0]['name'] == 'TechNova Solutions'
    assert response.json[1]['name'] == 'GreenLeaf Enterprises'

@patch('app.get_all_companies')
def test_company_list_with_search(mock_get_all_companies, client):
    """Test searching for companies by name"""
    # Mock data for companies
    mock_companies = [
        {"company_id": 1, "name": "TechNova Solutions", "address": "123 Innovation Drive, San Francisco, CA 94105", "latitude": 37.7749, "longitude": -122.4194},
        {"company_id": 2, "name": "GreenLeaf Enterprises", "address": "456 Sustainability Ave, Portland, OR 97201", "latitude": 45.5155, "longitude": -122.6789}
    ]
    mock_get_all_companies.return_value = mock_companies

    response = client.get('/companies?search=tech')
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['name'] == 'TechNova Solutions'

@patch('app.get_company_by_id')
def test_company_detail(mock_get_company_by_id, client):
    """Test retrieving details of a specific company"""
    # Mock data for a single company
    mock_company = {"company_id": 1, "name": "TechNova Solutions", "address": "123 Innovation Drive, San Francisco, CA 94105", "latitude": 37.7749, "longitude": -122.4194}
    mock_get_company_by_id.return_value = mock_company

    response = client.get('/company/1')
    assert response.status_code == 200
    assert response.json['name'] == 'TechNova Solutions'
    assert response.json['company_id'] == 1

def test_company_detail_invalid_id(client):
    """Test retrieving company details with an invalid ID"""
    response = client.get('/company/-1')
    assert response.status_code == 404
    json_data = response.get_json()
    assert json_data is not None
    assert 'error' in json_data
    assert json_data['error'] == 'Route not found'

@patch('app.get_company_by_id')
def test_company_detail_not_found(mock_get_company_by_id, client):
    """Test retrieving details of a non-existent company"""
    mock_get_company_by_id.return_value = None
    response = client.get('/company/999')
    assert response.status_code == 404
    json_data = response.get_json()
    assert json_data is not None
    assert 'message' in json_data
    assert 'Company not found' in json_data['message']

@patch('app.get_locations_by_company_id')
def test_company_locations(mock_get_locations_by_company_id, client):
    """Test retrieving locations for a specific company"""
    # Mock data for company locations
    mock_locations = [
        {"company_id": 2, "location_id": 6, "address": "456 Sustainability Ave, Portland, OR 97201", "latitude": 45.5155, "longitude": -122.6789, "employees": 300},
        {"company_id": 2, "location_id": 7, "address": "789 Renewable Way, Seattle, WA 98101", "latitude": 47.6062, "longitude": -122.3321, "employees": 150}
    ]
    mock_get_locations_by_company_id.return_value = mock_locations

    response = client.get('/company/2/locations')
    assert response.status_code == 200
    assert len(response.json) == 2
    assert response.json[0]['address'] == '456 Sustainability Ave, Portland, OR 97201'

def test_company_locations_invalid_id(client):
    """Test retrieving company locations with an invalid ID"""
    response = client.get('/company/-1/locations')
    print(f"Response status code: {response.status_code}")
    print(f"Response data: {response.data}")
    print(f"Response headers: {response.headers}")
    
    assert response.status_code == 404
    json_data = response.get_json()
    assert json_data is not None
    assert 'error' in json_data
    assert json_data['error'] == 'Route not found'

@patch('app.get_locations_by_company_id')
def test_company_locations_not_found(mock_get_locations_by_company_id, client):
    """Test retrieving locations for a non-existent company"""
    mock_get_locations_by_company_id.return_value = None
    response = client.get('/company/999/locations')
    print(f"Response status code: {response.status_code}")
    print(f"Response data: {response.data}")
    assert response.status_code == 404
    json_data = response.get_json()
    assert json_data is not None
    assert 'message' in json_data
    assert 'Company not found' in json_data['message']
