from kthcloud_go_deploy_v2 import KthcloudGoDeployV2
from dotenv import load_dotenv
import os

# Loads the API key from the .env file (place it next to this script)
# It should look like this:
# API_KEY=your_api_key_here

load_dotenv()
API_KEY = os.getenv("API_KEY")

client = KthcloudGoDeployV2(api_key=API_KEY)

vms = client.vms.list()

if not vms:
    print("No VMs found")

for vm in vms:
    print(vm.name)
