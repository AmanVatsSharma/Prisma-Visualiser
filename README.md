# Prisma Schema Visual Builder

A powerful visual tool for designing and generating Prisma database schemas. Create, visualize, and manage your database models and relationships with an intuitive graphical interface.

![Schema Builder Screenshot](public/screenshot.png)

## Features

### 🎨 Visual Schema Design
- Interactive diagram editor
- Drag-and-drop model positioning
- Real-time relationship visualization
- Automatic layout organization

### 📝 Model Management
- Create and edit Prisma models
- Add and modify fields with types
- Set field attributes and modifiers
- Manage model attributes

### 🔗 Relationship Management
- Create various relationship types (1:1, 1:N, N:N)
- Configure field mappings
- Set referential actions
- Visual relationship validation

### 📊 Schema Visualization
- Interactive node-based diagram
- Relationship edge visualization
- Mini-map for navigation
- Zoom and pan controls

### 💻 Code Generation
- Real-time Prisma schema generation
- Syntax highlighting
- Copy to clipboard functionality
- Code preview with Monaco editor

### 📤 Export Options
- Export diagram as PNG
- Copy diagram to clipboard
- Copy generated schema
- Save schema to file

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/prisma-visualiser.git
cd prisma-visualiser
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Documentation

### User Guide
See the [User Guide](docs/user-guide.md) for detailed instructions on:
- Creating and editing models
- Managing relationships
- Using the visual diagram
- Generating and exporting schemas

### Developer Guide
See the [Developer Guide](docs/developer-guide.md) for:
- Project architecture
- Component documentation
- Adding new features
- Contributing guidelines

## Built With
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [React Flow](https://reactflow.dev/) - Diagram visualization
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor

## Contributing
We welcome contributions! Please see our [Contributing Guide](docs/developer-guide.md#contributing) for details.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Prisma](https://www.prisma.io/) for the amazing database toolkit
- [React Flow](https://reactflow.dev/) for the powerful diagram visualization
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
