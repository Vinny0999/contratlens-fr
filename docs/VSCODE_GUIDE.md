# VS Code Setup Guide

This guide shows how to set up and use ContratLens FR in Visual Studio Code.

## Open the Project

```bash
cd /path/to/contratlens-fr
code .
```

## Recommended Extensions

When you first open the project, VS Code will prompt you to install recommended extensions. Click **Install All** or install manually:

- **Python** - Python language support
- **Pylance** - Python language server
- **Black Formatter** - Python code formatting
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **ES7+ React Snippets** - React snippets
- **Thunder Client** - API testing (alternative to Postman)
- **Docker** - Docker support

## Setup Python Environment

1. Open Command Palette: `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: `Python: Select Interpreter`
3. Choose: `./backend/venv/bin/python`

If virtual environment doesn't exist:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Running the Project

### Option 1: Using VS Code Tasks (Recommended)

1. Press `Cmd+Shift+B` (macOS) or `Ctrl+Shift+B` (Windows/Linux)
2. Select **Start All Services**

This will start:
- Ollama service
- Backend (FastAPI)
- Frontend (Vite)

Each service runs in a separate terminal panel.

### Option 2: Manual Start

#### Terminal 1: Start Ollama
```bash
ollama serve
```

#### Terminal 2: Start Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

#### Terminal 3: Start Frontend
```bash
cd frontend
npm run dev
```

### Option 3: Using Debug Configuration

1. Go to Run and Debug panel (`Cmd+Shift+D`)
2. Select **Python: FastAPI Backend**
3. Press F5 to start debugging

## Integrated Terminal

VS Code provides multiple integrated terminals:

- **New Terminal**: `Ctrl+` ` (backtick)
- **Split Terminal**: Click the split icon
- **Terminal Tabs**: Switch between multiple terminals

## File Navigation

### Quick Open
- `Cmd+P` (macOS) or `Ctrl+P` (Windows/Linux)
- Type filename to quickly open

### Go to Symbol
- `Cmd+Shift+O` (macOS) or `Ctrl+Shift+O` (Windows/Linux)
- Navigate functions/classes in current file

### Go to Definition
- `F12` or `Cmd+Click` on any function/variable

## Code Editing Tips

### Auto-format on Save
Already configured! Files auto-format when you save.

### Python Snippets
- Type `def` → function template
- Type `class` → class template

### React Snippets
- Type `rfc` → React Functional Component
- Type `useState` → useState hook

## API Testing with Thunder Client

1. Install Thunder Client extension
2. Click Thunder Client icon in sidebar
3. Create a new request:
   - **GET** `http://localhost:8000/health`
   - **POST** `http://localhost:8000/api/v1/documents/upload`

## Debugging

### Python Backend

1. Set breakpoints by clicking left of line numbers
2. Press F5 to start debugging
3. Use Debug Console to inspect variables

### Frontend (Browser)

1. Open Chrome DevTools (`F12`)
2. Use React DevTools extension
3. Console for logs and errors

## Project Structure in VS Code

```
contratlens-fr/
├── .vscode/              ← VS Code settings
│   ├── settings.json     ← Editor settings
│   ├── launch.json       ← Debug configurations
│   ├── tasks.json        ← Build tasks
│   └── extensions.json   ← Recommended extensions
├── backend/
│   └── app/
│       ├── api/          ← REST API endpoints
│       ├── services/     ← Business logic
│       ├── models/       ← Data models
│       └── core/         ← Config & utilities
├── frontend/
│   └── src/
│       ├── components/   ← Reusable components
│       └── pages/        ← Page components
└── data/                 ← Data storage
```

## Keyboard Shortcuts

### General
- `Cmd+Shift+P` - Command Palette
- `Cmd+P` - Quick Open File
- `Cmd+B` - Toggle Sidebar
- `Cmd+J` - Toggle Panel

### Editing
- `Alt+Up/Down` - Move line up/down
- `Shift+Alt+Up/Down` - Copy line up/down
- `Cmd+D` - Select next occurrence
- `Cmd+/` - Toggle comment

### Search
- `Cmd+F` - Find in file
- `Cmd+Shift+F` - Find in project
- `Cmd+H` - Find and replace

### Terminal
- `Ctrl+` ` - Toggle terminal
- `Cmd+\` - Split terminal

## Workspace Settings

The project includes pre-configured settings:

- **Auto-format on save** - Python (Black) and JavaScript (Prettier)
- **Import organization** - Automatically sorts imports
- **Linting** - Flake8 for Python, ESLint for JavaScript
- **File exclusions** - Hides __pycache__, node_modules, etc.

## Git Integration

VS Code has built-in Git support:

- **Source Control Panel**: `Cmd+Shift+G`
- **View Changes**: Click files to see diffs
- **Stage Changes**: Click `+` icon
- **Commit**: Type message and click ✓
- **Push/Pull**: Click `...` menu

## Problems Panel

View errors and warnings:
- `Cmd+Shift+M` - Open Problems panel
- Shows Python, JavaScript, and TypeScript errors
- Click to jump to problem location

## Search and Replace

### Project-wide Search
1. `Cmd+Shift+F` - Open Search panel
2. Enter search term
3. Click file to see results
4. Use Replace to update all files

### Regex Search
- Enable regex with `.*` button
- Example: `def\s+\w+\(` finds all function definitions

## Customization

### User Settings
- `Cmd+,` - Open Settings
- Search for specific settings
- Toggle between UI and JSON

### Keyboard Shortcuts
- `Cmd+K Cmd+S` - Open Keyboard Shortcuts
- Customize any shortcut

### Color Theme
- `Cmd+K Cmd+T` - Choose Color Theme
- Recommended: Dark+ (default dark)

## Troubleshooting

### Python Import Errors
1. Verify interpreter: `Cmd+Shift+P` → `Python: Select Interpreter`
2. Select `./backend/venv/bin/python`
3. Restart VS Code

### Port Already in Use
1. Open integrated terminal
2. Kill process: `lsof -ti:8000 | xargs kill -9`
3. Restart service

### Frontend Not Loading
1. Check terminal for errors
2. Verify Node version: `node --version` (should be 18+)
3. Reinstall: `cd frontend && rm -rf node_modules && npm install`

## Tips & Tricks

1. **Multi-cursor editing**: `Alt+Click` to add cursors
2. **Column selection**: `Shift+Alt+Drag`
3. **Zen mode**: `Cmd+K Z` for distraction-free coding
4. **Command palette**: `Cmd+Shift+P` is your friend!
5. **Terminal history**: Use up/down arrows

## Next Steps

1. ✅ Install recommended extensions
2. ✅ Setup Python environment
3. ✅ Start all services (`Cmd+Shift+B`)
4. ✅ Open browser to http://localhost:5173
5. ✅ Start coding!

## Additional Resources

- [VS Code Python Tutorial](https://code.visualstudio.com/docs/python/python-tutorial)
- [VS Code React Tutorial](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial)
- [VS Code Debugging](https://code.visualstudio.com/docs/editor/debugging)
- [VS Code Keyboard Shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)

Happy coding! 🚀
