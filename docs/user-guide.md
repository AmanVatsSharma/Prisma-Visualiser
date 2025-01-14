# Prisma Schema Visual Builder - User Guide

## Introduction
Prisma Schema Visual Builder is a powerful tool that helps you design and visualize your database schema using Prisma's schema definition language. This guide will walk you through all the features and help you get started with building your schema.

## Getting Started

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:3000`

### Interface Overview
The application is divided into three main sections:
1. **Model Editor** (Left panel, top)
2. **Relationship Manager** (Left panel, bottom)
3. **Schema Visualization** (Right panel)

## Features

### 1. Model Management

#### Creating a Model
1. Click the "Add Model" button
2. Enter a model name (must be PascalCase)
3. Add model attributes if needed (e.g., `@id`, `@unique`)
4. Click "Create" to add the model

#### Adding Fields
1. Select a model from the list
2. Click "Add Field"
3. Enter field details:
   - Name (must be camelCase)
   - Type (e.g., String, Int, DateTime)
   - Required/Optional
   - List/Single
   - Attributes (e.g., `@id`, `@default`)
4. Click "Add" to save the field

#### Editing Models
- Click on a model to edit its properties
- Drag fields to reorder them
- Click the delete icon to remove fields or the entire model

### 2. Relationship Management

#### Creating Relationships
1. Click "Add Relationship"
2. Select:
   - Source model
   - Target model
   - Relationship type (1:1, 1:N, N:N)
3. Configure field mappings:
   - Select fields for both models
   - Set referential actions (onDelete, onUpdate)
4. Click "Create" to add the relationship

#### Relationship Types
- **One-to-One**: Each record in model A relates to one record in model B
- **One-to-Many**: Each record in model A relates to multiple records in model B
- **Many-to-Many**: Multiple records in model A relate to multiple records in model B

### 3. Schema Visualization

#### Diagram View
- **Pan**: Click and drag on empty space
- **Zoom**: Use mouse wheel or zoom controls
- **Select**: Click on nodes or edges
- **Move**: Drag nodes to rearrange
- **Resize**: Drag node corners to resize

#### Node Features
- Model name and attributes displayed in header
- Fields listed with types and attributes
- Input/output handles for relationships
- Resizable nodes for better organization

#### Edge Features
- Relationship type indicators (1:1, 1:N, N:N)
- Field mapping tooltips on hover
- Smooth curved paths
- Arrow markers showing direction

#### Controls
- **Reset Layout**: Automatically arrange nodes
- **Mini-map**: Quick navigation and overview
- **Zoom Controls**: Adjust view scale
- **Background Grid**: Visual reference

### 4. Code Generation

#### Viewing Generated Code
1. Click the "Generated Code" tab
2. View the auto-generated Prisma schema
3. Code updates in real-time as you make changes

#### Export Options
1. **Copy to Clipboard**: Click "Copy to Clipboard" button
2. **Manual Copy**: Select and copy text from editor
3. **Save**: Copy and save to a `.prisma` file

#### Schema Structure
- Datasource and generator blocks
- Model definitions with fields
- Relationship declarations
- Attributes and modifiers

### 5. Export Features

#### Diagram Export
1. Click "Download PNG" to save the diagram
2. Click "Copy to Clipboard" to copy as image
3. Image includes:
   - All models and relationships
   - Current layout and styling
   - Background grid

## Best Practices

### Model Design
1. Use PascalCase for model names
2. Use camelCase for field names
3. Add proper indexes and unique constraints
4. Document complex relationships

### Relationship Design
1. Choose appropriate relationship types
2. Set proper referential actions
3. Use meaningful field names
4. Avoid circular dependencies

### Visual Organization
1. Group related models together
2. Minimize edge crossings
3. Use consistent spacing
4. Keep the diagram readable

## Troubleshooting

### Common Issues
1. **Invalid Model Names**: Ensure PascalCase naming
2. **Field Type Errors**: Verify supported Prisma types
3. **Relationship Errors**: Check field compatibility
4. **Layout Issues**: Try resetting the layout

### Error Messages
- Read validation messages carefully
- Fix issues before proceeding
- Check field types and attributes
- Verify relationship configurations

## Keyboard Shortcuts

### Navigation
- `Ctrl + Scroll`: Zoom in/out
- `Space + Drag`: Pan the diagram
- `Esc`: Clear selection

### Editing
- `Delete`: Remove selected items
- `Ctrl + C`: Copy selected items
- `Ctrl + V`: Paste items
- `Ctrl + Z`: Undo last action

## Tips and Tricks

### Performance
1. Use appropriate zoom level
2. Collapse unused sections
3. Organize models efficiently
4. Use the mini-map for navigation

### Organization
1. Plan your schema structure
2. Group related models
3. Use consistent naming
4. Document complex parts

### Workflow
1. Create models first
2. Add essential fields
3. Define relationships
4. Add indexes and constraints
5. Review and optimize 