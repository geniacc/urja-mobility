import os
import re

def replace_template_assets(content):
    # Replace `/assets/foo` -> `${import.meta.env.BASE_URL}assets/foo`
    content = re.sub(r'`/assets/([^`]+)`', r'`${import.meta.env.BASE_URL}assets/\1`', content)
    
    # Check if there are any remaining "/assets/" or '/assets/' that were missed.
    # The previous script might have missed some that weren't preceded by `+ ` but had other structures.
    # We will do a manual check if needed, but for now just fix template literals.
    return content

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = replace_template_assets(content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
