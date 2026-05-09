import os
import re

def replace_assets(content):
    # Replace JSX src="/assets/..." -> src={import.meta.env.BASE_URL + 'assets/...'}
    content = re.sub(r'src=\"/assets/([^\"]+)\"', r"src={import.meta.env.BASE_URL + 'assets/\1'}", content)
    
    # Replace JSX poster="/assets/..." -> poster={import.meta.env.BASE_URL + 'assets/...'}
    content = re.sub(r'poster=\"/assets/([^\"]+)\"', r"poster={import.meta.env.BASE_URL + 'assets/\1'}", content)
    
    # Replace Object values: image: "/assets/..." -> image: import.meta.env.BASE_URL + "assets/..."
    content = re.sub(r'image:\s*\"/assets/([^\"]+)\"', r'image: import.meta.env.BASE_URL + "assets/\1"', content)
    content = re.sub(r'src:\s*\"/assets/([^\"]+)\"', r'src: import.meta.env.BASE_URL + "assets/\1"', content)
    content = re.sub(r'poster:\s*\"/assets/([^\"]+)\"', r'poster: import.meta.env.BASE_URL + "assets/\1"', content)
    content = re.sub(r'subtitle:\s*\"/assets/([^\"]+)\"', r'subtitle: import.meta.env.BASE_URL + "assets/\1"', content)
    content = re.sub(r'previewSrc:\s*\"/assets/([^\"]+)\"', r'previewSrc: import.meta.env.BASE_URL + "assets/\1"', content)
    
    # Also arrays of strings like "/assets/..." -> import.meta.env.BASE_URL + "assets/..."
    # E.g. in mockData gallery: [ "/assets/...", "/assets/..." ]
    # We can do a broader replace for any "/assets/..." that hasn't been matched
    # But wait, what if it's already inside `{...}`? Let's be careful.
    
    # Replace any stray "/assets/..." with import.meta.env.BASE_URL + "assets/..."
    # but only if it's not already preceded by BASE_URL + or similar.
    # To be safe, let's just do a blanket replace for `"/assets/` to `import.meta.env.BASE_URL + "assets/`
    # and then fix up the ones in JSX attributes if they got messed up.
    
    return content

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.js', '.jsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Blanket replace:
            # First, handle JSX attributes: src="/assets/foo" -> src={import.meta.env.BASE_URL + "assets/foo"}
            # using regex that looks for an attribute name followed by ="/assets/... "
            new_content = re.sub(r'([a-zA-Z0-9_]+)=\"/assets/([^\"]+)\"', r'\1={import.meta.env.BASE_URL + "assets/\2"}', content)
            
            # Next, handle generic strings: "/assets/foo" -> import.meta.env.BASE_URL + "assets/foo"
            # we need to be careful not to replace it if it's already done.
            new_content = re.sub(r'(?<!\+ )\"/assets/([^\"]+)\"', r'import.meta.env.BASE_URL + "assets/\1"', new_content)
            
            # What about '/assets/foo' ?
            new_content = re.sub(r'(?<!\+ )\'/assets/([^\']+)\'', r"import.meta.env.BASE_URL + 'assets/\1'", new_content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated {filepath}')
