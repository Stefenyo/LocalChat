/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PromptTemplatesRouteImport } from './routes/prompt-templates/route'
import { Route as IndexImport } from './routes/index'
import { Route as PromptTemplatesSubPromptsImport } from './routes/prompt-templates/sub-prompts'
import { Route as PromptTemplatesBaseImport } from './routes/prompt-templates/base'

// Create/Update Routes

const PromptTemplatesRouteRoute = PromptTemplatesRouteImport.update({
  id: '/prompt-templates',
  path: '/prompt-templates',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PromptTemplatesSubPromptsRoute = PromptTemplatesSubPromptsImport.update({
  id: '/sub-prompts',
  path: '/sub-prompts',
  getParentRoute: () => PromptTemplatesRouteRoute,
} as any)

const PromptTemplatesBaseRoute = PromptTemplatesBaseImport.update({
  id: '/base',
  path: '/base',
  getParentRoute: () => PromptTemplatesRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/prompt-templates': {
      id: '/prompt-templates'
      path: '/prompt-templates'
      fullPath: '/prompt-templates'
      preLoaderRoute: typeof PromptTemplatesRouteImport
      parentRoute: typeof rootRoute
    }
    '/prompt-templates/base': {
      id: '/prompt-templates/base'
      path: '/base'
      fullPath: '/prompt-templates/base'
      preLoaderRoute: typeof PromptTemplatesBaseImport
      parentRoute: typeof PromptTemplatesRouteImport
    }
    '/prompt-templates/sub-prompts': {
      id: '/prompt-templates/sub-prompts'
      path: '/sub-prompts'
      fullPath: '/prompt-templates/sub-prompts'
      preLoaderRoute: typeof PromptTemplatesSubPromptsImport
      parentRoute: typeof PromptTemplatesRouteImport
    }
  }
}

// Create and export the route tree

interface PromptTemplatesRouteRouteChildren {
  PromptTemplatesBaseRoute: typeof PromptTemplatesBaseRoute
  PromptTemplatesSubPromptsRoute: typeof PromptTemplatesSubPromptsRoute
}

const PromptTemplatesRouteRouteChildren: PromptTemplatesRouteRouteChildren = {
  PromptTemplatesBaseRoute: PromptTemplatesBaseRoute,
  PromptTemplatesSubPromptsRoute: PromptTemplatesSubPromptsRoute,
}

const PromptTemplatesRouteRouteWithChildren =
  PromptTemplatesRouteRoute._addFileChildren(PromptTemplatesRouteRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/prompt-templates': typeof PromptTemplatesRouteRouteWithChildren
  '/prompt-templates/base': typeof PromptTemplatesBaseRoute
  '/prompt-templates/sub-prompts': typeof PromptTemplatesSubPromptsRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/prompt-templates': typeof PromptTemplatesRouteRouteWithChildren
  '/prompt-templates/base': typeof PromptTemplatesBaseRoute
  '/prompt-templates/sub-prompts': typeof PromptTemplatesSubPromptsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/prompt-templates': typeof PromptTemplatesRouteRouteWithChildren
  '/prompt-templates/base': typeof PromptTemplatesBaseRoute
  '/prompt-templates/sub-prompts': typeof PromptTemplatesSubPromptsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/prompt-templates'
    | '/prompt-templates/base'
    | '/prompt-templates/sub-prompts'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/prompt-templates'
    | '/prompt-templates/base'
    | '/prompt-templates/sub-prompts'
  id:
    | '__root__'
    | '/'
    | '/prompt-templates'
    | '/prompt-templates/base'
    | '/prompt-templates/sub-prompts'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PromptTemplatesRouteRoute: typeof PromptTemplatesRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PromptTemplatesRouteRoute: PromptTemplatesRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/prompt-templates"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/prompt-templates": {
      "filePath": "prompt-templates/route.tsx",
      "children": [
        "/prompt-templates/base",
        "/prompt-templates/sub-prompts"
      ]
    },
    "/prompt-templates/base": {
      "filePath": "prompt-templates/base.tsx",
      "parent": "/prompt-templates"
    },
    "/prompt-templates/sub-prompts": {
      "filePath": "prompt-templates/sub-prompts.tsx",
      "parent": "/prompt-templates"
    }
  }
}
ROUTE_MANIFEST_END */
