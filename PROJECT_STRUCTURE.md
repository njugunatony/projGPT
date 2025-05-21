globos-site/
├── .gitignore                 # Ignore node_modules, build, etc.
├── README.md                  # Project overview, setup, usage docs
├── package.json               # NPM package config, scripts, dependencies
├── public/
│   └── favicon.ico            # Site favicon
├── src/
│   ├── App.css                # Main global styles
│   ├── App.tsx                # Root application, sets up routes/providers
│   ├── components/            # Shared and logical UI building blocks
│   │   ├── auth/              # Authentication-related UI
│   │   │   ├── Login.tsx           # Login form
│   │   │   ├── Signup.tsx          # Registration form
│   │   │   ├── ForgotPassword.tsx  # "Forgot password" form
│   │   │   └── ContactAdmin.tsx    # Contact/Support form
│   │   ├── common/            # Reusable UI (modals, layout, spinner)
│   │   │   ├── DashboardLayout.tsx     # Dashboard shell for all dashboards
│   │   │   ├── SubscriptionModal.tsx   # Popup for subscription info/upgrade
│   │   │   └── LoadingSpinner.tsx      # Loader/spinner UI
│   │   ├── core/              # App-wide context/providers and utilities
│   │   │   ├── ApiClient.ts         # Centralized API requests
│   │   │   ├── AuthContext.tsx      # Authentication context/provider
│   │   │   └── ProtectedRoute.tsx   # Route guard for auth/roles
│   │   ├── Endgame.tsx           # Endgame/closing statement component
│   │   ├── Header.tsx            # App/site header
│   │   ├── KeyPillar.tsx         # Single "pillar" of the platform
│   │   ├── KeyPillarsList.tsx    # Pillar list/overview
│   │   ├── ModuleSection.tsx     # Display info for a module
│   │   ├── NotableFeatures.tsx   # Features highlight
│   │   ├── TargetUserSection.tsx # Describes a user segment
│   │   ├── modules/              # Business modules (HR, CRM, etc.)
│   │   │   ├── CRMModule.tsx
│   │   │   ├── DeliveryFulfillmentModule.tsx
│   │   │   ├── DocumentEngineModule.tsx
│   │   │   ├── EcommerceModule.tsx
│   │   │   ├── FinanceModule.tsx
│   │   │   ├── HRModule.tsx
│   │   │   ├── LogisticsModule.tsx
│   │   │   ├── RealEstateModule.tsx
│   │   │   └── SmartNotificationModule.tsx
│   │   ├── pages/                # Top-level pages/views
│   │   │   ├── SuperAdminDashboard.tsx # Superadmin view of all companies/users
│   │   │   └── TenantDashboard.tsx     # Tenant (client company) dashboard
│   │   ├── VisionStatement.tsx   # Platform vision/mission
│   ├── data/                     # Static data for UI rendering
│   │   ├── modulesData.ts        # Info about each business module
│   │   ├── targetUsersData.ts    # Info about each user segment
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts            # Auth state hook
│   │   ├── useSubscription.ts    # Subscription state hook
│   ├── models/                   # TS interfaces/types for data models
│   │   ├── User.ts               # User model (id, email, role, etc.)
│   ├── services/                 # Business logic/api access
│   │   ├── authService.ts        # Auth API calls (login, signup, etc.)
│   │   ├── subscriptionService.ts# Subscription API logic
│   │   ├── userService.ts        # User profile/update API
│   ├── store/                    # Global state/context (Context or Redux)
│   │   └── AppStateContext.tsx   # Example: App state using Context API
│   ├── index.css                 # General global styles
│   ├── index.tsx                 # Entry point, renders <App />
│   ├── react-app-env.d.ts        # React type declarations
│   ├── vite-env.d.ts             # Vite type declarations
├── tsconfig.json                 # TypeScript config for app
├── tsconfig.node.json            # TS config for Node tools
└── vite.config.ts                # Vite build/config