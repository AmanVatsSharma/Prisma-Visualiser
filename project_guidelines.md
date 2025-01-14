# Prisma Schema Visual Builder - Project Guidelines

## Project Overview
A visual interface for creating and managing Prisma database schemas. This tool aims to simplify database design by providing an intuitive drag-and-drop interface while maintaining all the power and flexibility of Prisma's schema definition language.

## Tech Stack
- **Frontend Framework**: Next.js 14 with App Router
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Drag and Drop**: react-dnd or @dnd-kit/core
- **Diagram Tools**: reactflow
- **Schema Parsing**: @prisma/sdk
- **Code Editor**: @monaco-editor/react
- **Testing**: Vitest + React Testing Library
- **Type Safety**: TypeScript
- **Code Quality**: ESLint + Prettier

## Core Features (v1)

### 1. Model Editor
- Drag-and-drop interface for creating models
- Field type selector with all Prisma types
- Field attribute editor (unique, optional, default, etc.)
- Real-time validation of model names and fields
- Support for model-level attributes

### 2. Relationship Manager
- Visual relationship creation between models
- Support for all Prisma relationship types:
  - One-to-One
  - One-to-Many
  - Many-to-Many
- Relationship property editor
- Cascade delete configuration
- Referential actions setup

### 3. Schema Visualization
- ERD-style diagram of all models
- Interactive relationship lines
- Zoom and pan controls
- Mini-map for large schemas
- Export diagram as image

### 4. Code Generation
- Real-time Prisma schema code preview
- Syntax highlighting
- Copy to clipboard functionality
- Schema file download
- Migration command preview

## Project Structure
```
src/
├── components/
│   ├── editor/         # Schema editing components
│   ├── visualization/  # Diagram and visualization
│   ├── ui/            # Reusable UI components
│   └── layout/        # Layout components
├── lib/
│   ├── store/         # Zustand store
│   ├── validation/    # Schema validation
│   ├── generators/    # Code generation
│   └── types/         # TypeScript types
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── app/              # Next.js app router pages
```

## Development Phases

### Phase 1: Core Infrastructure
1. Set up Next.js project with TypeScript
2. Configure Tailwind and shadcn/ui
3. Implement basic state management
4. Create component structure
5. Set up testing environment

### Phase 2: Basic Model Editor
1. Implement model creation interface
2. Add field type system
3. Create attribute editor
4. Build real-time validation
5. Develop code preview

### Phase 3: Relationship Management
1. Implement relationship visualization
2. Add relationship creation interface
3. Build relationship property editor
4. Create validation system
5. Update code generation

### Phase 4: Schema Visualization
1. Implement ERD diagram
2. Add interactive features
3. Create mini-map
4. Build export functionality
5. Add zoom/pan controls

## Data Models

### Model Definition
```typescript
interface PrismaModel {
  name: string;
  fields: PrismaField[];
  attributes: ModelAttribute[];
  relationships: Relationship[];
}

interface PrismaField {
  name: string;
  type: PrismaType;
  attributes: FieldAttribute[];
  isRequired: boolean;
  defaultValue?: any;
}

interface Relationship {
  fromModel: string;
  toModel: string;
  type: RelationType;
  fields: RelationField[];
  referentialActions: ReferentialActions;
}
```

## Testing Strategy
- Unit tests for all utilities and helpers
- Component tests for UI elements
- Integration tests for model operations
- E2E tests for critical user flows
- Performance testing for large schemas

## Performance Considerations
- Implement virtualization for large schemas
- Optimize relationship rendering
- Use web workers for code generation
- Implement efficient state updates
- Cache generated code and diagrams

## Accessibility Requirements
- Keyboard navigation for all features
- ARIA labels and roles
- High contrast mode support
- Screen reader compatibility
- Focus management

## Future Features (v2)
- Collaborative editing
- Schema version control
- Migration management
- Database seeding interface
- Custom generator plugins
- Schema templates
- Import from existing databases
- Export to multiple formats

## Getting Started
1. Clone repository
2. Install dependencies: `pnpm install`
3. Run development server: `pnpm dev`
4. Run tests: `pnpm test`

## Contributing Guidelines
- Follow conventional commits
- Write tests for new features
- Update documentation
- Follow code style guidelines
- Create feature branches