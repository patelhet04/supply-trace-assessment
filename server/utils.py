import logging

def setup_logging():
    """Configure logging for the application"""
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    return logging.getLogger(__name__)

logger = setup_logging()

def validate_positive_integer(value):
    """Validate if a value is a positive integer"""
    return isinstance(value, int) and value > 0
