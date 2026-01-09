import os
import re

# Define the path to the assets and mockData file
assets_path = r"c:\Users\ASUS\Documents\trae_projects\urja\public\assets"
mock_data_path = r"c:\Users\ASUS\Documents\trae_projects\urja\src\data\mockData.js"

# List of specific image files provided by the user
image_files = [
    "Anurag Sharma-Assistant Manager Operations.jpg",
    "Beekey Kumar-Deputy General Manager- Credits.jpeg",
    "Bharti Mishra- Customer Support Executive.jpeg",
    "Dhirandra Singh Negi- Vice President Operations.jpeg",
    "Ritu-Executive-Operations & Support.jpeg",
    "Rohit Kumar-After Sales Service Manager.jpeg",
    "Sanju Yadav- Customer Support Executive.jpeg",
    "Sourav Dey- Sales & Marketing Executive.jpg"
]

def parse_filename(filename):
    # Remove extension
    name_part = os.path.splitext(filename)[0]
    # Split by hyphen to get Name and Role
    # Some have multiple hyphens, assume first part is name
    parts = name_part.split('-')
    name = parts[0].strip()
    role = '-'.join(parts[1:]).strip() if len(parts) > 1 else "Team Member"
    
    # Clean up role (remove leading hyphens/spaces if any)
    role = role.lstrip('- ')
    
    return name, role

def update_mock_data():
    with open(mock_data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract the teamMembers array block
    start_marker = "export const teamMembers = ["
    end_marker = "];"
    
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("Could not find teamMembers array")
        return

    end_idx = content.find(end_marker, start_idx) + len(end_marker)
    
    array_content = content[start_idx:end_idx]
    
    # Parse existing members from the string (simple parsing)
    # We will rebuild the list
    
    # Create a dictionary of existing members for easy lookup
    # This is a bit complex to parse with regex safely, but let's try to identify lines
    
    # Strategy: 
    # 1. Construct a list of new member objects from the images.
    # 2. Iterate through the file content line by line.
    # 3. If we match a name, update the image.
    # 4. If we have new members left over, append them? 
    #    Actually, user said "use them correctly". 
    #    Replacing the generic avatars with real ones is the priority.
    #    Adding missing people is also important.
    
    lines = array_content.split('\n')
    new_lines = []
    
    # Map of Name -> (Image Filename, Role)
    image_map = {}
    for img_file in image_files:
        name, role = parse_filename(img_file)
        image_map[name.upper()] = (img_file, role)
        # Also handle Ritu -> RITU
        
    print("Image Map:", image_map)

    processed_names = set()
    max_id = 0

    for line in lines:
        if "id:" in line:
            # Extract ID to find max
            id_match = re.search(r'id:\s*(\d+)', line)
            if id_match:
                max_id = max(max_id, int(id_match.group(1)))
            
            # Extract Name
            name_match = re.search(r'name:\s*"([^"]+)"', line)
            if name_match:
                current_name = name_match.group(1).upper()
                
                # Check if we have an image for this person
                matched_key = None
                if current_name in image_map:
                    matched_key = current_name
                else:
                    # Try partial match or fuzzy match if needed?
                    # For now, exact match on uppercase
                    pass
                
                if matched_key:
                    img_file, new_role = image_map[matched_key]
                    processed_names.add(matched_key)
                    
                    # Update Image Path
                    # Replace image: "..." with image: "/assets/..."
                    line = re.sub(r'image:\s*"[^"]+"', f'image: "/assets/{img_file}"', line)
                    
                    # Optional: Update Role if it differs? 
                    # The filenames have roles, maybe we should update them to match the file info
                    # The user said "names and images", maybe implied roles too?
                    # Let's update the role if provided in filename, as it's likely more accurate/specific
                    if new_role:
                        # Case insensitive replacement for role to avoid issues
                        # But we need to be careful not to break syntax
                        line = re.sub(r'role:\s*"[^"]+"', f'role: "{new_role.upper()}"', line)
            
        new_lines.append(line)

    # Add missing members
    # Find the insertion point (before the last line which is likely "];")
    insert_idx = len(new_lines) - 1
    
    for name_key in image_map:
        if name_key not in processed_names:
            img_file, role = image_map[name_key]
            max_id += 1
            # Infer department? Default to "OPERATIONS" or "MANAGEMENT" based on role?
            dept = "OPERATIONS" # Default
            if "SALES" in role.upper() or "MARKETING" in role.upper():
                dept = "SALES & MARKETING"
            elif "CREDIT" in role.upper():
                dept = "CREDIT"
            elif "SUPPORT" in role.upper():
                dept = "SUPPORT"
            
            new_entry = f'  {{ id: {max_id}, name: "{name_key}", department: "{dept}", role: "{role.upper()}", image: "/assets/{img_file}" }},'
            new_lines.insert(insert_idx, new_entry)
            insert_idx += 1
            print(f"Added new member: {name_key}")

    updated_array_content = '\n'.join(new_lines)
    
    # Replace in full content
    new_full_content = content[:start_idx] + updated_array_content + content[end_idx:]
    
    with open(mock_data_path, 'w', encoding='utf-8') as f:
        f.write(new_full_content)
    
    print("Successfully updated mockData.js")

if __name__ == "__main__":
    update_mock_data()
