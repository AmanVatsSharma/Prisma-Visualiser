# Prisma Schema Visual Builder - Developer Guide

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui
- **State Management**: Zustand
- **Visualization**: React Flow
- **Code Editor**: Monaco Editor
- **Schema Generation**: Custom utilities

### Project Structure
```
prisma-visualiser/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── editor/           # Schema editing components
│   ├── ui/              # Shared UI components
│   └── visualization/   # Diagram components
├── lib/                  # Core utilities
│   ├── store/           # State management
│   └── utils/           # Helper functions
├── public/              # Static assets
└── docs/               # Documentation
```

## Core Components

### 1. Model Editor
- **Location**: `components/editor/model-form.tsx`
- **Purpose**: Create and edit Prisma models
- **Features**:
  - Model name validation
  - Field management
  - Attribute handling
  - Real-time validation

### 2. Relationship Manager
- **Location**: `components/editor/relationship-form.tsx`
- **Purpose**: Manage model relationships
- **Features**:
  - Relationship type selection
  - Field mapping
  - Referential actions
  - Validation rules

### 3. Schema Diagram
- **Location**: `components/visualization/schema-diagram.tsx`
- **Purpose**: Visual representation of schema
- **Features**:
  - Interactive nodes
  - Relationship edges
  - Layout controls
  - Export capabilities

### 4. Code Preview
- **Location**: `components/editor/code-preview.tsx`
- **Purpose**: Display generated Prisma schema
- **Features**:
  - Syntax highlighting
  - Real-time updates
  - Copy functionality
  - Monaco editor integration

## State Management

### Schema Store
- **Location**: `lib/store/schema-store.ts`
- **Purpose**: Central state management
- **Features**:
  - Model state
  - Relationship state
  - Persistence
  - Actions and selectors

### Types
```typescript
interface PrismaModel {
  id: string
  name: string
  fields: ModelField[]
  attributes: ModelAttribute[]
}

interface ModelField {
  name: string
  type: string
  isRequired: boolean
  isList: boolean
  attributes: string[]
}

interface Relationship {
  id: string
  fromModel: string
  toModel: string
  type: RelationType
  config: RelationshipConfig
}
```

## Utilities

### Schema Generator
- **Location**: `lib/utils/schema-generator.ts`
- **Purpose**: Generate Prisma schema code
- **Features**:
  - Model generation
  - Field formatting
  - Relationship handling
  - Attribute processing

### Validation
- **Location**: `lib/utils/validation.ts`
- **Purpose**: Input validation
- **Features**:
  - Name validation
  - Type checking
  - Relationship validation
  - Error messaging

## Component APIs

### ModelForm
```typescript
interface ModelFormProps {
  onSubmit: (model: PrismaModel) => void
  initialData?: PrismaModel
}
```

### RelationshipForm
```typescript
interface RelationshipFormProps {
  onSubmit: (relationship: Relationship) => void
  initialData?: Relationship
}
```

### SchemaDiagram
```typescript
interface SchemaDiagramProps {
  className?: string
}
```

### CodePreview
```typescript
interface CodePreviewProps {
  className?: string
}
```

## Adding New Features

### 1. Adding Model Features
1. Update `PrismaModel` type
2. Modify model form component
3. Update schema generator
4. Add validation rules

### 2. Adding Relationship Types
1. Update `RelationType` enum
2. Modify relationship form
3. Update edge component
4. Add validation rules

### 3. Adding Visualization Features
1. Create new node/edge types
2. Register in schema diagram
3. Update layout algorithm
4. Add controls if needed

### 4. Adding Code Generation Features
1. Update schema generator
2. Add new formatting functions
3. Update preview component
4. Add validation if needed

## Best Practices

### Code Style
1. Use TypeScript for type safety
2. Follow React hooks best practices
3. Keep components focused
4. Use proper error handling

### State Management
1. Keep state normalized
2. Use selectors for derived data
3. Implement proper actions
4. Handle side effects

### Performance
1. Memoize expensive operations
2. Use proper React hooks
3. Optimize re-renders
4. Handle large schemas

### Error Handling
1. Validate inputs
2. Provide clear error messages
3. Handle edge cases
4. Log errors appropriately

## Common Tasks

### Adding a New Field Type
1. Update `ModelField` type
2. Add to field type selector
3. Update schema generator
4. Add validation rules

### Adding a New Attribute
1. Update attribute types
2. Add to attribute selector
3. Update schema generator
4. Add validation rules

### Modifying Layout Algorithm
1. Update node positioning
2. Modify edge routing
3. Update controls
4. Test with various schemas

### Adding Export Options
1. Create export function
2. Add UI controls
3. Handle errors
4. Add file handling

## Troubleshooting

### Common Issues
1. State updates not reflecting
2. Layout issues
3. Type errors
4. Performance problems

### Debugging
1. Use React DevTools
2. Check state updates
3. Verify types
4. Monitor performance

## Contributing

### Setup
1. Fork repository
2. Install dependencies
3. Create feature branch
4. Run development server

### Development Flow
1. Create feature branch
2. Implement changes
3. Add documentation
4. Create pull request

### Code Review
1. Follow style guide
2. Add tests if needed
3. Update documentation
4. Request review

### Release Process
1. Version bump
2. Update changelog
3. Create release
4. Deploy changes 