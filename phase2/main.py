import sys
import os
# Add the backend directory to the Python path so we can import from it
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Now import and run the backend app
from backend.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)