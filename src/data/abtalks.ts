export type DayStatus = "completed" | "missed" | "frozen" | "today" | "upcoming";

export type Submission = {
  githubUrl: string;
  linkedinUrl: string;
  linkedinCaption: string;
  submittedAt: string;
};

export type ChallengeDay = {
  dayNumber: number;
  title: string;
  description: string;
  learningObjectives: string[];
  track: string;
  estimatedTime: string;
  difficulty: "Starter" | "Core" | "Stretch";
  status: DayStatus;
  submission: Submission | null;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  unlockedAt: string | null;
  badgeStyle: "blue" | "yellow" | "red" | "ink";
};

export type Student = {
  name: string;
  avatarUrl: string;
  initials: string;
  track: string;
  joinedDate: string;
  currentStreak: number;
  longestStreak: number;
  streakFreezesAvailable: number;
  streakFreezesUsed: number;
  totalDaysCompleted: number;
  completionPercentage: number;
  streakState: "alive" | "at-risk" | "broken" | "not-started";
  username: string;
  isPublic: boolean;
  selectedTrackId: string | null;
  seenMilestones: number[];
  notificationPrefs: {
    eveningReminder: boolean;
  };
};

export type Track = {
  id: string;
  name: string;
  description: string;
  totalStudents: number;
  exampleTasks: string[];
  challengeDays: Omit<ChallengeDay, "status" | "submission">[];
};

export type SubmissionRecord = {
  dayNumber: number;
  trackId: string;
  taskTitle: string;
  submittedAt: string;
  githubUrl: string;
  linkedinUrl: string;
  status: DayStatus;
  aiFeedback?: string | null;
  aiFeedbackStatus?: "pending" | "success" | "failed" | null;
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  name: string;
  avatarUrl: string;
  initials: string;
  trackId: string;
  currentStreak: number;
  completionPercentage: number;
};

export type Profile = {
  id: ProfileId;
  label: string;
  blurb: string;
  student: Student;
  days: ChallengeDay[];
  achievements: Achievement[];
};

export type ProfileId = "mid" | "first-day" | "empty";

export type MockTimeOfDay = "day" | "evening" | "late-night";

/* ── Curriculum: Web Dev (60 days) ── */

type DaySeed = { title: string; description: string; objectives: string[] };

const webDevCurriculum: DaySeed[] = [
  {
    title: "Set up your build environment",
    description:
      "Install Node 20, set up a Vite + React project, initialise a public GitHub repo, and push your first commit. Your repo is the spine of the next 60 days.",
    objectives: ["Node + package manager setup", "Vite project scaffold", "First commit pushed"],
  },
  {
    title: "Semantic HTML profile card",
    description:
      "Build a profile card using only semantic HTML — header, article, figure, footer. No divs allowed except for layout wrappers.",
    objectives: ["Semantic element choice", "Accessible image alt text", "Document outline"],
  },
  {
    title: "CSS box model drills",
    description:
      "Recreate three layouts from screenshots using margin, padding, and border only. No flexbox yet — you need to feel the box model first.",
    objectives: ["Content vs border box", "Margin collapsing", "Pixel-accurate spacing"],
  },
  {
    title: "Flexbox layout gauntlet",
    description:
      "Build a nav bar, a card row, and a sticky footer layout with flexbox. Handle wrapping at 390px without media queries.",
    objectives: ["Main vs cross axis", "flex-grow / shrink / basis", "Wrapping behaviour"],
  },
  {
    title: "CSS Grid dashboard shell",
    description:
      "Lay out a dashboard shell with CSS Grid: sidebar, header, content, and a responsive card area using grid-template-areas.",
    objectives: ["grid-template-areas", "minmax and auto-fit", "Responsive reflow"],
  },
  {
    title: "JavaScript arrays and objects",
    description:
      "Write ten transform functions over a messy JSON dataset using map, filter, reduce, and destructuring. No for loops.",
    objectives: ["Array method fluency", "Destructuring", "Immutable transforms"],
  },
  {
    title: "DOM events and delegation",
    description:
      "Build a to-do list in vanilla JS using a single delegated click listener on the container instead of per-item handlers.",
    objectives: ["Event bubbling", "Event delegation", "Dataset attributes"],
  },
  {
    title: "Fetch and async/await",
    description:
      "Consume a public API, render the results, and handle loading and error states properly. Every request needs a failure path.",
    objectives: ["Promises and async/await", "Error handling", "Loading states"],
  },
  {
    title: "Your first React components",
    description:
      "Convert yesterday's vanilla page into React components with props. Split into at least four components with clear boundaries.",
    objectives: ["JSX", "Props and composition", "Component boundaries"],
  },
  {
    title: "State with useState",
    description:
      "Build a filterable product list with controlled inputs. State lives in exactly one place — find where it belongs.",
    objectives: ["useState", "Controlled inputs", "Lifting state up"],
  },
  {
    title: "Effects and data fetching",
    description:
      "Fetch data inside a component with proper cleanup and an abort controller so fast navigation never leaves a stale response behind.",
    objectives: ["useEffect dependencies", "Cleanup functions", "AbortController"],
  },
  {
    title: "Build a reusable component library",
    description:
      "Extract Button, Input, Card, and Badge into a small internal library with variants driven by props. Document each variant in a demo route.",
    objectives: [
      "Variant-driven component APIs",
      "Composition over configuration",
      "A living component demo page",
    ],
  },
  {
    title: "Client-side routing",
    description:
      "Add routing with nested layouts and a 404 page. Deep links must work on refresh, not just on client navigation.",
    objectives: ["Route configuration", "Nested layouts", "404 handling"],
  },
  {
    title: "Forms and validation",
    description:
      "Build a signup form with inline validation, error messages tied to inputs via aria-describedby, and a disabled submit until valid.",
    objectives: ["Form state", "Validation rules", "Accessible errors"],
  },
  {
    title: "Global state without a library",
    description:
      "Implement a theme and auth context using React context plus a reducer. Measure re-renders before and after.",
    objectives: ["Context API", "useReducer", "Render performance"],
  },
  {
    title: "Data fetching with TanStack Query",
    description:
      "Replace your manual fetch code with a query library. Add caching, refetch on focus, and optimistic updates on one mutation.",
    objectives: ["Query keys", "Cache invalidation", "Optimistic updates"],
  },
  {
    title: "Responsive design at 390px",
    description:
      "Take your app mobile-first. Every screen must be usable one-handed on a 390px viewport with no horizontal scroll.",
    objectives: ["Mobile-first breakpoints", "Touch targets", "Fluid type"],
  },
  {
    title: "Accessibility audit",
    description:
      "Run your app through keyboard-only navigation and a screen reader. Fix focus order, labels, and contrast failures.",
    objectives: ["Keyboard navigation", "ARIA labels", "Colour contrast"],
  },
  {
    title: "Design tokens and theming",
    description:
      "Move every hardcoded colour and size into CSS variables, then ship a dark mode toggle that persists across reloads.",
    objectives: ["CSS custom properties", "Theme switching", "Persistence"],
  },
  {
    title: "Animation with intent",
    description:
      "Add three animations that communicate state change — not decoration. Respect prefers-reduced-motion.",
    objectives: ["Transitions vs keyframes", "Motion purpose", "Reduced motion"],
  },
  {
    title: "Node and Express basics",
    description:
      "Stand up an Express server with three routes, JSON body parsing, and a health check endpoint.",
    objectives: ["HTTP verbs", "Middleware", "Route handlers"],
  },
  {
    title: "REST API design",
    description:
      "Design and implement a resource API with correct status codes, pagination, and consistent error shapes.",
    objectives: ["Resource modelling", "Status codes", "Pagination"],
  },
  {
    title: "Databases: schema design",
    description:
      "Model your app's data in Postgres. Write the migration by hand — tables, foreign keys, indexes, constraints.",
    objectives: ["Normalisation", "Foreign keys", "Indexes"],
  },
  {
    title: "CRUD end to end",
    description:
      "Wire your frontend to your API for full create, read, update, delete. Handle the error path for every operation.",
    objectives: ["End-to-end wiring", "Error surfaces", "Loading feedback"],
  },
  {
    title: "Authentication",
    description:
      "Add email/password auth with hashed passwords and session handling. Protect at least one route on both client and server.",
    objectives: ["Password hashing", "Sessions or JWTs", "Route protection"],
  },
  {
    title: "Authorisation and roles",
    description:
      "Add a role system so an admin sees more than a normal user. Enforce it server-side, never in the UI alone.",
    objectives: ["Role modelling", "Server-side checks", "Least privilege"],
  },
  {
    title: "File uploads",
    description:
      "Let users upload an avatar with client-side size/type validation and server-side verification before storage.",
    objectives: ["Multipart uploads", "Validation", "Storage URLs"],
  },
  {
    title: "Environment and secrets",
    description:
      "Move every key out of your code into environment variables. Document required vars in your README.",
    objectives: ["Env var handling", "Secret hygiene", "Config documentation"],
  },
  {
    title: "Testing fundamentals",
    description:
      "Write unit tests for your three most bug-prone functions. Aim for meaningful assertions, not coverage theatre.",
    objectives: ["Test structure", "Assertions", "Test naming"],
  },
  {
    title: "Component testing",
    description:
      "Test a form component the way a user uses it: type, submit, assert on visible output. No implementation details.",
    objectives: ["Testing Library queries", "User events", "Behaviour-first tests"],
  },
  {
    title: "Halfway checkpoint: refactor",
    description:
      "No new features today. Delete dead code, rename anything confusing, and split your biggest file into three.",
    objectives: ["Code smells", "Naming", "Module boundaries"],
  },
  {
    title: "Git workflow discipline",
    description:
      "Practice branching, rebasing, and writing commit messages that explain why. Open a PR against your own repo and review it.",
    objectives: ["Branching", "Interactive rebase", "PR review"],
  },
  {
    title: "CI pipeline",
    description:
      "Add GitHub Actions to run lint and tests on every push. A red build must block the merge.",
    objectives: ["Workflow YAML", "Caching", "Status checks"],
  },
  {
    title: "Deploy to production",
    description:
      "Ship your app to a live URL with environment variables configured. Share the link — it has to work on someone else's phone.",
    objectives: ["Build output", "Env config in prod", "Custom domain basics"],
  },
  {
    title: "Error monitoring",
    description:
      "Add an error boundary plus a logging hook so client crashes are recorded rather than silently swallowed.",
    objectives: ["Error boundaries", "Structured logging", "Alerting basics"],
  },
  {
    title: "Performance: measure first",
    description:
      "Run Lighthouse on mobile throttling and write down your three worst metrics before changing a single line.",
    objectives: ["Core Web Vitals", "Profiling", "Baseline measurement"],
  },
  {
    title: "Performance: bundle diet",
    description:
      "Code-split routes, lazy load heavy components, and remove at least one dependency you do not need.",
    objectives: ["Code splitting", "Lazy loading", "Dependency audit"],
  },
  {
    title: "Image and asset optimisation",
    description:
      "Serve responsive images with correct sizes, modern formats, and explicit dimensions to kill layout shift.",
    objectives: ["srcset and sizes", "Modern formats", "CLS prevention"],
  },
  {
    title: "Caching strategies",
    description:
      "Add HTTP caching headers and a client cache policy. Explain in your post which requests you made cheaper and why.",
    objectives: ["Cache-Control", "ETags", "Client cache tuning"],
  },
  {
    title: "SEO and metadata",
    description:
      "Give every route a unique title, description, and Open Graph tags. Validate one link preview in a debugger.",
    objectives: ["Per-page metadata", "Open Graph", "Structured data"],
  },
  {
    title: "Real-time features",
    description:
      "Add live updates with WebSockets or server-sent events. Handle reconnect after the connection drops.",
    objectives: ["WebSockets vs SSE", "Reconnect logic", "Live state merge"],
  },
  {
    title: "Background jobs",
    description:
      "Move one slow operation off the request path into a queued job with a visible status in the UI.",
    objectives: ["Queues", "Job status", "Idempotency"],
  },
  {
    title: "Emails and notifications",
    description:
      "Send a transactional email on signup with a templated body. Log delivery failures instead of ignoring them.",
    objectives: ["Transactional email", "Templating", "Failure handling"],
  },
  {
    title: "Payments walkthrough",
    description:
      "Integrate a test-mode checkout, handle the success and cancel routes, and verify the webhook signature.",
    objectives: ["Checkout flow", "Webhooks", "Signature verification"],
  },
  {
    title: "Security pass",
    description:
      "Review your app for XSS, injection, and broken access control. Fix at least one real issue you find.",
    objectives: ["OWASP top risks", "Input sanitisation", "Access control"],
  },
  {
    title: "Rate limiting and abuse",
    description:
      "Add per-IP rate limiting to your write endpoints and return a helpful 429 instead of falling over.",
    objectives: ["Rate limit algorithms", "429 responses", "Abuse patterns"],
  },
  {
    title: "Observability dashboard",
    description:
      "Instrument request timing and error counts, then render them on an internal admin page you can actually read.",
    objectives: ["Metrics", "Instrumentation", "Admin tooling"],
  },
  {
    title: "TypeScript strict mode",
    description:
      "Turn on strict mode and eliminate every any. Model your domain types properly instead of casting.",
    objectives: ["Strict flags", "Domain modelling", "Type narrowing"],
  },
  {
    title: "Generics and utility types",
    description:
      "Write one genuinely generic helper and use Pick, Omit, and Record to remove duplicated type declarations.",
    objectives: ["Generics", "Utility types", "Type reuse"],
  },
  {
    title: "API contract types",
    description:
      "Share types between client and server so a backend change breaks the frontend build instead of production.",
    objectives: ["Shared types", "Runtime validation", "Contract safety"],
  },
  {
    title: "Empty, loading, and error states",
    description:
      "Design real states for every data surface in your app. No blank screens, no raw undefined, no spinner-only screens.",
    objectives: ["State coverage", "Copy writing", "Progressive disclosure"],
  },
  {
    title: "Onboarding flow",
    description:
      "Build a three-step onboarding that gets a brand-new user to their first useful action in under a minute.",
    objectives: ["Progressive onboarding", "Step state", "Time to value"],
  },
  {
    title: "Search and filtering",
    description:
      "Add debounced search with URL-synced filters so a filtered view can be shared as a link.",
    objectives: ["Debouncing", "URL state", "Server-side filtering"],
  },
  {
    title: "Data visualisation",
    description:
      "Chart one meaningful metric from your own app data. Label the axes and make it readable at 390px.",
    objectives: ["Chart selection", "Axis labelling", "Mobile charts"],
  },
  {
    title: "Offline and flaky networks",
    description:
      "Handle offline gracefully: cache the last good response, show a clear banner, and retry when the connection returns.",
    objectives: ["Service workers", "Retry policy", "Offline UX"],
  },
  {
    title: "Documentation",
    description:
      "Write a README a stranger can follow: what it does, how to run it, architecture in five bullet points.",
    objectives: ["README structure", "Setup instructions", "Architecture notes"],
  },
  {
    title: "Portfolio page",
    description:
      "Build the page that shows this project off: problem, screenshots, stack, and the decisions you are proud of.",
    objectives: ["Case study writing", "Screenshots", "Decision narrative"],
  },
  {
    title: "Recruiter-ready GitHub",
    description:
      "Clean up your repo: pinned projects, clear descriptions, tidy commit history, and a profile README.",
    objectives: ["Repo hygiene", "Profile README", "Signal over noise"],
  },
  {
    title: "Mock interview walkthrough",
    description:
      "Record yourself explaining your project in five minutes: problem, architecture, hardest bug, what you would change.",
    objectives: ["Technical storytelling", "Architecture recall", "Self-critique"],
  },
  {
    title: "Ship and reflect",
    description:
      "Final deploy, final post. Write what changed in you over 60 days — the habit is the deliverable, the app is the proof.",
    objectives: ["Final deploy", "Retrospective", "Next 60 days plan"],
  },
];

/* ── Curriculum: AI / ML (60 days) ── */

const aiMlCurriculum: DaySeed[] = [
  {
    title: "Python environment and Jupyter setup",
    description:
      "Install Python 3.11, create a virtual environment, install Jupyter Lab, and push your first notebook to a public GitHub repo.",
    objectives: ["Virtual environment setup", "Jupyter Lab basics", "First commit pushed"],
  },
  {
    title: "NumPy fundamentals",
    description:
      "Create, reshape, and slice arrays. Write five vectorised operations and compare speed against native Python loops.",
    objectives: ["Array creation and shapes", "Broadcasting", "Vectorised operations"],
  },
  {
    title: "Pandas data wrangling",
    description:
      "Load a CSV into a DataFrame, clean missing values, filter rows, and compute group-level aggregates. No Excel allowed.",
    objectives: ["DataFrame indexing", "Handling nulls", "GroupBy aggregates"],
  },
  {
    title: "Data visualisation with Matplotlib",
    description:
      "Plot three chart types — line, bar, scatter — from a real dataset. Label every axis and add a title that tells a story.",
    objectives: ["Plot types", "Axis labelling", "Figure composition"],
  },
  {
    title: "Exploratory data analysis",
    description:
      "Pick a Kaggle dataset and produce a full EDA notebook: distributions, correlations, outliers, and three written insights.",
    objectives: ["Distribution analysis", "Correlation matrices", "Insight writing"],
  },
  {
    title: "Statistics for ML",
    description:
      "Compute mean, median, standard deviation, and percentiles by hand, then verify with NumPy. Understand when each matters.",
    objectives: ["Descriptive statistics", "Variance and std dev", "Percentile interpretation"],
  },
  {
    title: "Probability and Bayes' theorem",
    description:
      "Solve three probability problems from scratch. Implement a naive Bayesian spam classifier on a tiny dataset.",
    objectives: ["Conditional probability", "Bayes' theorem", "Prior vs posterior"],
  },
  {
    title: "Linear algebra essentials",
    description:
      "Multiply matrices, compute dot products, and find eigenvalues using NumPy. Understand why ML frameworks think in tensors.",
    objectives: ["Matrix operations", "Dot products", "Eigenvalues intuition"],
  },
  {
    title: "Linear regression from scratch",
    description:
      "Implement gradient descent for simple linear regression without scikit-learn. Plot the loss curve and the fit line.",
    objectives: ["Cost function", "Gradient descent", "Convergence plotting"],
  },
  {
    title: "Linear regression with scikit-learn",
    description:
      "Reimplement yesterday's model using scikit-learn's API. Add train/test split and evaluate with MSE and R².",
    objectives: ["Scikit-learn API", "Train/test split", "Evaluation metrics"],
  },
  {
    title: "Polynomial and regularised regression",
    description:
      "Fit polynomial features and show overfitting. Apply Ridge and Lasso to tame it. Compare coefficients before and after.",
    objectives: ["Polynomial features", "Ridge vs Lasso", "Regularisation effect"],
  },
  {
    title: "Logistic regression",
    description:
      "Build a binary classifier for a tabular dataset. Plot the decision boundary and compute precision, recall, and F1.",
    objectives: ["Sigmoid function", "Decision boundary", "Classification metrics"],
  },
  {
    title: "Decision trees",
    description:
      "Train a decision tree, visualise it, and interpret the splits. Identify where it overfits and try max_depth limits.",
    objectives: ["Tree visualisation", "Overfitting detection", "Hyperparameter tuning"],
  },
  {
    title: "Random forests and ensembles",
    description:
      "Compare a single tree to a random forest on the same data. Show that bagging reduces variance with a concrete metric.",
    objectives: ["Bagging", "Feature importance", "Variance reduction"],
  },
  {
    title: "Support vector machines",
    description:
      "Train an SVM with different kernels. Visualise the margin and support vectors on a 2D dataset.",
    objectives: ["Kernel trick", "Margin and support vectors", "Kernel comparison"],
  },
  {
    title: "K-nearest neighbours",
    description:
      "Implement KNN from scratch, then with scikit-learn. Show how K choice affects the decision boundary.",
    objectives: ["Distance metrics", "K selection", "Bias-variance with K"],
  },
  {
    title: "Clustering with K-Means",
    description:
      "Cluster a dataset with K-Means. Use the elbow method and silhouette score to pick K. Visualise cluster assignments.",
    objectives: ["K-Means algorithm", "Elbow method", "Silhouette score"],
  },
  {
    title: "Dimensionality reduction with PCA",
    description:
      "Reduce a high-dimensional dataset to 2D with PCA. Show explained variance and interpret the principal components.",
    objectives: ["PCA intuition", "Explained variance", "Component interpretation"],
  },
  {
    title: "Feature engineering",
    description:
      "Create five meaningful features from raw data. Show how each one improves (or doesn't) model performance.",
    objectives: ["Feature creation", "Domain knowledge", "Performance impact"],
  },
  {
    title: "Cross-validation and model selection",
    description:
      "Run k-fold cross-validation on three models and pick the best one. Explain why a single train/test split isn't enough.",
    objectives: ["K-fold CV", "Model comparison", "Overfitting detection"],
  },
  {
    title: "Hyperparameter tuning with GridSearch",
    description:
      "Use GridSearchCV to tune a random forest. Compare grid search vs random search on computation time and result quality.",
    objectives: ["GridSearchCV", "RandomizedSearchCV", "Search space design"],
  },
  {
    title: "Handling imbalanced datasets",
    description:
      "Train a model on an imbalanced dataset and watch it fail. Apply SMOTE, class weights, and threshold tuning to fix it.",
    objectives: ["Class imbalance", "SMOTE", "Threshold tuning"],
  },
  {
    title: "Pipelines and reproducibility",
    description:
      "Build a scikit-learn Pipeline that chains preprocessing and modelling. Make your workflow reproducible end to end.",
    objectives: ["Pipeline API", "ColumnTransformer", "Reproducibility"],
  },
  {
    title: "Introduction to neural networks",
    description:
      "Build a single-layer perceptron from scratch in NumPy. Train it on a linearly separable 2D dataset and plot the boundary.",
    objectives: ["Perceptron", "Activation functions", "Forward pass"],
  },
  {
    title: "Multi-layer networks and backprop",
    description:
      "Add a hidden layer to your perceptron. Implement backpropagation by hand and verify gradients numerically.",
    objectives: ["Backpropagation", "Chain rule", "Gradient checking"],
  },
  {
    title: "PyTorch fundamentals",
    description:
      "Install PyTorch and rewrite your NumPy neural net using tensors and autograd. Compare training speed on CPU.",
    objectives: ["Tensors", "Autograd", "Training loop"],
  },
  {
    title: "Building a PyTorch classifier",
    description:
      "Train a 3-layer network on a tabular dataset using PyTorch. Use DataLoaders, proper batching, and a validation set.",
    objectives: ["nn.Module", "DataLoader", "Validation loop"],
  },
  {
    title: "Convolutional neural networks",
    description:
      "Build a CNN for image classification on MNIST or Fashion-MNIST. Visualise learned filters from the first conv layer.",
    objectives: ["Conv layers", "Pooling", "Filter visualisation"],
  },
  {
    title: "Transfer learning with a pretrained model",
    description:
      "Fine-tune a pretrained ResNet on a small custom dataset. Show that transfer learning beats training from scratch.",
    objectives: ["Pretrained models", "Fine-tuning", "Feature extraction"],
  },
  {
    title: "Recurrent neural networks",
    description:
      "Build an LSTM for sequence prediction — next character or next word. Train on a small text corpus and generate samples.",
    objectives: ["LSTM architecture", "Sequence modelling", "Text generation"],
  },
  {
    title: "Halfway checkpoint: model review",
    description:
      "No new models today. Review your notebooks, clean code, add markdown explanations, and organise your repo.",
    objectives: ["Notebook hygiene", "Documentation", "Repo organisation"],
  },
  {
    title: "Natural language processing basics",
    description:
      "Tokenise, stem, and vectorise a text dataset. Build a TF-IDF based document classifier.",
    objectives: ["Tokenisation", "TF-IDF", "Text classification"],
  },
  {
    title: "Word embeddings",
    description:
      "Train Word2Vec on a corpus and explore the embedding space. Find analogies and visualise with t-SNE.",
    objectives: ["Word2Vec", "Embedding space", "t-SNE visualisation"],
  },
  {
    title: "Transformers and attention",
    description:
      "Understand the attention mechanism conceptually. Use Hugging Face transformers for sentiment classification out of the box.",
    objectives: ["Attention mechanism", "Hugging Face pipeline", "Sentiment analysis"],
  },
  {
    title: "Fine-tuning a language model",
    description:
      "Fine-tune a DistilBERT model on a custom text classification task. Evaluate on a held-out test set.",
    objectives: ["Model fine-tuning", "DistilBERT", "Custom classification"],
  },
  {
    title: "Generative AI: prompt engineering",
    description:
      "Experiment with an LLM API. Write five prompt patterns (few-shot, chain-of-thought, etc.) and compare output quality.",
    objectives: ["Prompt patterns", "Few-shot learning", "Output evaluation"],
  },
  {
    title: "Building a RAG pipeline",
    description:
      "Implement retrieval-augmented generation: chunk documents, embed them, retrieve relevant context, and generate answers.",
    objectives: ["Document chunking", "Vector search", "Context injection"],
  },
  {
    title: "Image classification project",
    description:
      "Build an end-to-end image classifier: data loading, augmentation, training, evaluation, and a prediction function.",
    objectives: ["Data augmentation", "Training pipeline", "Prediction API"],
  },
  {
    title: "Object detection overview",
    description:
      "Use a pretrained YOLO or SSD model to detect objects in images. Understand bounding boxes, IoU, and mAP.",
    objectives: ["Bounding boxes", "IoU metric", "Pretrained detection"],
  },
  {
    title: "Time series forecasting",
    description:
      "Build an ARIMA model and a simple LSTM for time series. Compare their forecasts on a real-world dataset.",
    objectives: ["ARIMA", "LSTM for sequences", "Forecast evaluation"],
  },
  {
    title: "Recommendation systems",
    description:
      "Build a collaborative filtering recommender using matrix factorisation. Evaluate with precision@k.",
    objectives: ["Collaborative filtering", "Matrix factorisation", "Evaluation metrics"],
  },
  {
    title: "Anomaly detection",
    description:
      "Detect outliers in a dataset using Isolation Forest and autoencoders. Compare results and explain trade-offs.",
    objectives: ["Isolation Forest", "Autoencoder", "Anomaly scoring"],
  },
  {
    title: "Reinforcement learning basics",
    description:
      "Implement Q-learning for a simple grid world. Watch the agent learn a policy over episodes.",
    objectives: ["Q-table", "Exploration vs exploitation", "Policy convergence"],
  },
  {
    title: "Model interpretability",
    description:
      "Use SHAP values and LIME to explain predictions from a black-box model. Communicate findings to a non-technical audience.",
    objectives: ["SHAP values", "LIME explanations", "Stakeholder communication"],
  },
  {
    title: "ML experiment tracking",
    description:
      "Set up MLflow or Weights & Biases to track experiments. Log hyperparameters, metrics, and model artifacts.",
    objectives: ["Experiment tracking", "Metric logging", "Artifact storage"],
  },
  {
    title: "Data versioning",
    description:
      "Use DVC or a similar tool to version your datasets. Ensure any collaborator can reproduce your results.",
    objectives: ["Data versioning", "Reproducibility", "Collaboration"],
  },
  {
    title: "Model serialisation and serving",
    description:
      "Save your best model with joblib/pickle and load it in a Flask/FastAPI endpoint. Serve predictions via HTTP.",
    objectives: ["Model serialisation", "API endpoint", "Prediction serving"],
  },
  {
    title: "Containerising your ML app",
    description:
      "Write a Dockerfile for your model API. Build and run the container locally. Test the endpoint from outside.",
    objectives: ["Docker basics", "Container build", "API testing"],
  },
  {
    title: "Cloud deployment",
    description:
      "Deploy your containerised model to a cloud platform. Make the prediction endpoint publicly accessible.",
    objectives: ["Cloud deployment", "Environment config", "Public endpoint"],
  },
  {
    title: "Model monitoring",
    description:
      "Add basic monitoring to your deployed model: input distribution tracking, prediction latency, and error rates.",
    objectives: ["Input monitoring", "Latency tracking", "Drift detection"],
  },
  {
    title: "Ethics and bias in ML",
    description:
      "Audit a model for bias across demographic groups. Document findings and propose at least one mitigation strategy.",
    objectives: ["Bias auditing", "Fairness metrics", "Mitigation strategies"],
  },
  {
    title: "Responsible AI practices",
    description:
      "Write a model card for your best model: intended use, limitations, evaluation data, and ethical considerations.",
    objectives: ["Model cards", "Documentation", "Ethical review"],
  },
  {
    title: "Advanced PyTorch: custom datasets",
    description:
      "Build a custom Dataset class for a non-standard data format. Handle lazy loading and on-the-fly transforms.",
    objectives: ["Custom Dataset", "Lazy loading", "Transform pipeline"],
  },
  {
    title: "Mixed precision and performance",
    description:
      "Enable mixed precision training and measure the speedup. Profile your training loop and eliminate bottlenecks.",
    objectives: ["Mixed precision", "Profiling", "Bottleneck analysis"],
  },
  {
    title: "Capstone project: day 1 of 3",
    description:
      "Choose a real-world problem, find a dataset, and define your approach. Write a project proposal with clear success metrics.",
    objectives: ["Problem definition", "Dataset selection", "Success metrics"],
  },
  {
    title: "Capstone project: day 2 of 3",
    description:
      "Build, train, and evaluate your model. Document every decision and result in a clean notebook.",
    objectives: ["Model building", "Evaluation", "Documentation"],
  },
  {
    title: "Capstone project: day 3 of 3",
    description:
      "Deploy your capstone model, write the README, and create a demo video or live endpoint. Make it recruiter-ready.",
    objectives: ["Deployment", "README", "Demo creation"],
  },
  {
    title: "Portfolio and GitHub cleanup",
    description:
      "Pin your best repos, write clear descriptions, clean commit history, and craft a profile README that tells your ML story.",
    objectives: ["Repo hygiene", "Profile README", "Signal over noise"],
  },
  {
    title: "Mock interview walkthrough",
    description:
      "Record yourself explaining your capstone: problem, data, model choice, hardest bug, and what you'd do with more time.",
    objectives: ["Technical storytelling", "Architecture recall", "Self-critique"],
  },
  {
    title: "Ship and reflect",
    description:
      "Final deploy, final post. Write what changed in your understanding of ML over 60 days — the habit is the deliverable.",
    objectives: ["Final deploy", "Retrospective", "Next 60 days plan"],
  },
];

/* ── Track definitions ── */

function buildTrackDays(
  curriculum: DaySeed[],
  trackName: string,
): Omit<ChallengeDay, "status" | "submission">[] {
  return curriculum.map((seed, i) => {
    const dayNumber = i + 1;
    return {
      dayNumber,
      title: seed.title,
      description: seed.description,
      learningObjectives: seed.objectives,
      track: trackName,
      estimatedTime: dayNumber % 7 === 0 ? "2–3 hrs" : "60–90 min",
      difficulty: (dayNumber <= 10 ? "Starter" : dayNumber <= 45 ? "Core" : "Stretch") as
        | "Starter"
        | "Core"
        | "Stretch",
    };
  });
}

export const tracks: Track[] = [
  {
    id: "web-dev",
    name: "Web Dev",
    description: "Ship a real app: React, APIs, auth, deploys.",
    totalStudents: 1284,
    exampleTasks: [
      "Build a semantic HTML profile card",
      "Flexbox layout gauntlet",
      "State with useState",
    ],
    challengeDays: buildTrackDays(webDevCurriculum, "Web Dev"),
  },
  {
    id: "ai-ml",
    name: "AI / ML",
    description: "From NumPy to a deployed model endpoint.",
    totalStudents: 742,
    exampleTasks: [
      "Linear regression from scratch",
      "Build a CNN for image classification",
      "Fine-tune a language model",
    ],
    challengeDays: buildTrackDays(aiMlCurriculum, "AI / ML"),
  },
  {
    id: "dsa",
    name: "DSA",
    description: "60 days of patterns, not 600 random problems.",
    totalStudents: 968,
    exampleTasks: [
      "Two pointer techniques",
      "Binary search variants",
      "Dynamic programming fundamentals",
    ],
    challengeDays: buildTrackDays(webDevCurriculum, "DSA"), // reuse web dev as placeholder
  },
  {
    id: "mobile",
    name: "Mobile",
    description: "One React Native app, built screen by screen.",
    totalStudents: 411,
    exampleTasks: [
      "React Native setup and first screen",
      "Navigation and tab bars",
      "Native device APIs",
    ],
    challengeDays: buildTrackDays(webDevCurriculum, "Mobile"),
  },
  {
    id: "backend",
    name: "Backend",
    description: "APIs, databases, queues, and the ops around them.",
    totalStudents: 553,
    exampleTasks: [
      "REST API design and Express",
      "Database schema design",
      "Authentication and sessions",
    ],
    challengeDays: buildTrackDays(webDevCurriculum, "Backend"),
  },
];

export function getTrack(trackId: string): Track {
  return tracks.find((t) => t.id === trackId) ?? tracks[0]!;
}

/* ── Caption helper ── */

export function captionFor(day: number, title: string, objectives: string[]) {
  return `Day ${day} of my #ABTalks60DayChallenge 🚀

Today I built: ${title}.

What I learned:
• ${objectives[0] ?? "Shipped something small and finished it"}
• ${objectives[1] ?? "Kept the streak alive"}

Commit pushed, day logged. ${60 - day} to go.

#100DaysOfCode #BuildInPublic #ABTalks`;
}

/* ── Profile builder helpers ── */

function submissionFor(
  day: Omit<ChallengeDay, "status" | "submission">,
  username: string,
): Submission {
  const iso = new Date(Date.UTC(2026, 5, 1 + day.dayNumber, 21, 40)).toISOString();
  return {
    githubUrl: `https://github.com/${username}/abtalks-60/commit/${(day.dayNumber * 918273).toString(16)}`,
    linkedinUrl: `https://www.linkedin.com/posts/${username}_abtalks60daychallenge-day${day.dayNumber}`,
    linkedinCaption: captionFor(day.dayNumber, day.title, day.learningObjectives),
    submittedAt: iso,
  };
}

function buildProfileDays(
  trackId: string,
  statusFor: (dayNumber: number) => DayStatus,
  username: string,
): ChallengeDay[] {
  const track = getTrack(trackId);
  return track.challengeDays.map((base) => {
    const status = statusFor(base.dayNumber);
    return {
      ...base,
      status,
      submission: status === "completed" ? submissionFor(base, username) : null,
    };
  });
}

/* ── Profiles ── */

const midDays = buildProfileDays(
  "web-dev",
  (n) => {
    if (n === 6) return "frozen";
    if (n < 12) return "completed";
    if (n === 12) return "today";
    return "upcoming";
  },
  "riya-nandan",
);

const midProfile: Profile = {
  id: "mid",
  label: "Mid-challenge",
  blurb: "Day 12, one missed day saved by a freeze.",
  student: {
    name: "Riya Nandan",
    avatarUrl: "",
    initials: "RN",
    track: "Web Dev",
    joinedDate: "2026-06-01",
    currentStreak: 11,
    longestStreak: 11,
    streakFreezesAvailable: 1,
    streakFreezesUsed: 1,
    totalDaysCompleted: 11,
    completionPercentage: 18,
    streakState: "at-risk",
    username: "riya-nandan",
    isPublic: true,
    selectedTrackId: "web-dev",
    seenMilestones: [7],
    notificationPrefs: { eveningReminder: true },
  },
  days: midDays,
  achievements: [
    {
      id: "first-submission",
      title: "First Submission",
      description: "You shipped proof on day one.",
      unlockedAt: "2026-06-02",
      badgeStyle: "blue",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      description: "One full week without breaking the chain.",
      unlockedAt: "2026-06-08",
      badgeStyle: "yellow",
    },
    {
      id: "freeze-saved",
      title: "Saved by a Freeze",
      description: "You used a freeze token to protect day 6.",
      unlockedAt: "2026-06-07",
      badgeStyle: "blue",
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Reach day 30 to unlock.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "finisher",
      title: "60-Day Finisher",
      description: "Complete all 60 days.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
  ],
};

const firstDayProfile: Profile = {
  id: "first-day",
  label: "Day one",
  blurb: "Brand new. Streak starts today.",
  student: {
    name: "Arjun Mehta",
    avatarUrl: "",
    initials: "AM",
    track: "Web Dev",
    joinedDate: "2026-08-07",
    currentStreak: 0,
    longestStreak: 0,
    streakFreezesAvailable: 1,
    streakFreezesUsed: 0,
    totalDaysCompleted: 0,
    completionPercentage: 0,
    streakState: "not-started",
    username: "arjun-mehta",
    isPublic: true,
    selectedTrackId: "web-dev",
    seenMilestones: [],
    notificationPrefs: { eveningReminder: false },
  },
  days: buildProfileDays("web-dev", (n) => (n === 1 ? "today" : "upcoming"), "arjun-mehta"),
  achievements: [
    {
      id: "first-submission",
      title: "First Submission",
      description: "Submit day 1 proof to unlock.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      description: "Seven days in a row.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Reach day 30.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
  ],
};

const emptyProfile: Profile = {
  id: "empty",
  label: "Empty profile",
  blurb: "Enrolled, never submitted. Every section empty.",
  student: {
    name: "Sana Qureshi",
    avatarUrl: "",
    initials: "SQ",
    track: "Web Dev",
    joinedDate: "2026-07-20",
    currentStreak: 0,
    longestStreak: 0,
    streakFreezesAvailable: 1,
    streakFreezesUsed: 0,
    totalDaysCompleted: 0,
    completionPercentage: 0,
    streakState: "broken",
    username: "sana-qureshi",
    isPublic: false,
    selectedTrackId: "web-dev",
    seenMilestones: [],
    notificationPrefs: { eveningReminder: false },
  },
  days: buildProfileDays(
    "web-dev",
    (n) => {
      if (n < 12) return "missed";
      if (n === 12) return "today";
      return "upcoming";
    },
    "sana-qureshi",
  ),
  achievements: [
    {
      id: "first-submission",
      title: "First Submission",
      description: "Nothing submitted yet — this unlocks first.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "streak-7",
      title: "7-Day Streak",
      description: "Seven days in a row.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Reach day 30.",
      unlockedAt: null,
      badgeStyle: "ink",
    },
  ],
};

export const profiles: Record<ProfileId, Profile> = {
  mid: midProfile,
  "first-day": firstDayProfile,
  empty: emptyProfile,
};

export const profileList = [midProfile, firstDayProfile, emptyProfile];

export function getProfile(id?: string): Profile {
  if (id === "first-day" || id === "empty" || id === "mid") return profiles[id];
  return profiles["first-day"];
}

export const platformStats = {
  studentsOnStreak: 2847,
  proofsSubmitted: 148_920,
  collegesRepresented: 312,
  finishRate: 41,
};

/* ── Leaderboard mock data ── */

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: "priya-sharma", name: "Priya Sharma", avatarUrl: "", initials: "PS", trackId: "web-dev", currentStreak: 58, completionPercentage: 97 },
  { rank: 2, username: "vikram-singh", name: "Vikram Singh", avatarUrl: "", initials: "VS", trackId: "ai-ml", currentStreak: 55, completionPercentage: 92 },
  { rank: 3, username: "ananya-iyer", name: "Ananya Iyer", avatarUrl: "", initials: "AI", trackId: "web-dev", currentStreak: 52, completionPercentage: 87 },
  { rank: 4, username: "rohit-kumar", name: "Rohit Kumar", avatarUrl: "", initials: "RK", trackId: "dsa", currentStreak: 48, completionPercentage: 80 },
  { rank: 5, username: "meera-patel", name: "Meera Patel", avatarUrl: "", initials: "MP", trackId: "ai-ml", currentStreak: 45, completionPercentage: 75 },
  { rank: 6, username: "aditya-joshi", name: "Aditya Joshi", avatarUrl: "", initials: "AJ", trackId: "backend", currentStreak: 42, completionPercentage: 70 },
  { rank: 7, username: "sneha-reddy", name: "Sneha Reddy", avatarUrl: "", initials: "SR", trackId: "web-dev", currentStreak: 39, completionPercentage: 65 },
  { rank: 8, username: "karan-gupta", name: "Karan Gupta", avatarUrl: "", initials: "KG", trackId: "mobile", currentStreak: 36, completionPercentage: 60 },
  { rank: 9, username: "divya-nair", name: "Divya Nair", avatarUrl: "", initials: "DN", trackId: "ai-ml", currentStreak: 33, completionPercentage: 55 },
  { rank: 10, username: "arjun-das", name: "Arjun Das", avatarUrl: "", initials: "AD", trackId: "dsa", currentStreak: 30, completionPercentage: 50 },
  { rank: 11, username: "riya-nandan", name: "Riya Nandan", avatarUrl: "", initials: "RN", trackId: "web-dev", currentStreak: 11, completionPercentage: 18 },
  { rank: 12, username: "harsh-verma", name: "Harsh Verma", avatarUrl: "", initials: "HV", trackId: "backend", currentStreak: 27, completionPercentage: 45 },
  { rank: 13, username: "pooja-mishra", name: "Pooja Mishra", avatarUrl: "", initials: "PM", trackId: "web-dev", currentStreak: 24, completionPercentage: 40 },
  { rank: 14, username: "nikhil-rao", name: "Nikhil Rao", avatarUrl: "", initials: "NR", trackId: "ai-ml", currentStreak: 21, completionPercentage: 35 },
  { rank: 15, username: "kavya-menon", name: "Kavya Menon", avatarUrl: "", initials: "KM", trackId: "mobile", currentStreak: 18, completionPercentage: 30 },
  { rank: 16, username: "siddharth-b", name: "Siddharth Banerjee", avatarUrl: "", initials: "SB", trackId: "dsa", currentStreak: 15, completionPercentage: 25 },
  { rank: 17, username: "lakshmi-kr", name: "Lakshmi Krishnan", avatarUrl: "", initials: "LK", trackId: "web-dev", currentStreak: 12, completionPercentage: 20 },
  { rank: 18, username: "amit-t", name: "Amit Tiwari", avatarUrl: "", initials: "AT", trackId: "backend", currentStreak: 9, completionPercentage: 15 },
  { rank: 19, username: "nisha-chand", name: "Nisha Chand", avatarUrl: "", initials: "NC", trackId: "ai-ml", currentStreak: 6, completionPercentage: 10 },
  { rank: 20, username: "arjun-mehta", name: "Arjun Mehta", avatarUrl: "", initials: "AM", trackId: "web-dev", currentStreak: 0, completionPercentage: 0 },
];
