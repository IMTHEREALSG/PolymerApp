
# QuickNotes - Polymer Web App

A modern, responsive note-taking application built with Polymer 3.0 and styled with Tailwind CSS.

## 🚀 Features

- **Create & Edit Notes**: Simple interface for creating and editing notes with titles and content
- **Multiple Views**: Switch between grid and list layouts
- **Local Storage**: Notes are automatically saved to browser's local storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern design with smooth animations and transitions
- **Welcome Screen**: Elegant landing page with click-to-enter functionality
- **Statistics**: Track total notes and notes created this week
- **Keyboard Shortcuts**: Support for Ctrl/Cmd+Enter to save and Escape to cancel

## 🛠️ Technology Stack

- **Polymer 3.0**: Web components framework
- **Tailwind CSS**: Utility-first CSS framework
- **Web Components**: Modern browser APIs for custom elements
- **Local Storage**: Browser-based data persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QuickNotes-using-Polymer
```

2. Install dependencies:
```bash
npm install
npm install -g polymercli
```

3. Start the development server:
```bash
polymer serve
```

## 🏗️ Project Structure

```
src/
├── note-main.js      # Main application component
├── note-input.js     # Note creation/editing component
├── noteList.js       # Notes display component
└── style.css         # Tailwind CSS imports

index.html            # Main HTML file with welcome screen
package.json          # Dependencies and scripts
polymer.json          # Polymer build configuration
postcss.config.js     # PostCSS configuration for Tailwind
```

## 🎯 Usage

1. **Creating Notes**: Click on "Take a note..." to expand the input form
2. **Editing Notes**: Click the "Edit" button on any note card
3. **Deleting Notes**: Click the "Delete" button on any note card
4. **Switching Views**: Use the Grid/List toggle buttons in the header

## 🔧 Components

### QuickNotesApp (`note-main.js`)
Main application component that manages:
- Notes array and state management
- View mode switching (grid/list)
- Local storage operations
- Statistics calculation

### NoteInput (`note-input.js`)
Handles note creation and editing:
- Collapsible input interface
- Form validation
- Edit mode functionality
- Keyboard shortcuts

### NotesList (`noteList.js`)
Displays notes collection:
- Grid and list layout modes
- Note actions (edit, delete)
- Responsive design
- Empty state handling

## 🎨 Styling

The application uses Tailwind CSS for styling with custom animations and transitions. Key design features:

- Gradient backgrounds
- Glass-morphism effects
- Smooth hover animations
- Mobile-responsive layout
- Accessible focus states


