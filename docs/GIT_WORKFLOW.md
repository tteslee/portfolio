# Portfolio Tool - Git Workflow

## Branch Strategy

### Main Branches
- **`main`** - Production-ready code, always deployable
- **`develop`** - Integration branch for features, staging environment

### Feature Branches
- **`feature/feature-name`** - New features and enhancements
- **`fix/bug-description`** - Bug fixes and patches
- **`hotfix/urgent-fix`** - Critical production fixes
- **`docs/documentation`** - Documentation updates

## Workflow

### 1. Starting New Work

```bash
# Always start from develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Development Process

```bash
# Make your changes
# Stage files
git add .

# Commit with proper message format
git commit -m "feat(dashboard): add real-time metrics"

# Push to remote
git push origin feature/your-feature-name
```

### 3. Commit Message Format

Follow the conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Build process, tooling changes

**Scopes:**
- `dashboard` - Dashboard components
- `import` - Data import functionality
- `network` - Network visualization
- `ui` - User interface components
- `api` - Backend API
- `auth` - Authentication
- `deps` - Dependencies

### 4. Merging Work

#### Feature Branches → Develop
```bash
# Create pull request from feature branch to develop
# Review and approve
# Merge using "Squash and merge" or "Rebase and merge"
```

#### Develop → Main
```bash
# Create pull request from develop to main
# Review and approve
# Merge using "Create a merge commit"
```

### 5. Release Process

```bash
# Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Best Practices

### 1. Commit Guidelines
- Write clear, descriptive commit messages
- Use present tense ("add feature" not "added feature")
- Reference issues when applicable
- Keep commits atomic and focused

### 2. Branch Naming
- Use kebab-case: `feature/user-authentication`
- Be descriptive: `fix/csv-import-error`
- Include issue numbers: `feature/123-add-export`

### 3. Code Review
- All changes require pull request review
- Use descriptive PR titles and descriptions
- Include screenshots for UI changes
- Test thoroughly before requesting review

### 4. Conflict Resolution
```bash
# When conflicts occur
git fetch origin
git rebase origin/develop
# Resolve conflicts
git add .
git rebase --continue
```

## Environment Setup

### Pre-commit Hooks
```bash
# Install pre-commit hooks
npm install --save-dev husky lint-staged

# Configure in package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

### Git Aliases
```bash
# Add useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
```

## Troubleshooting

### Common Issues

1. **Accidental commit to main**
   ```bash
   git reset --soft HEAD~1
   git checkout -b feature/your-feature
   git commit -m "your message"
   ```

2. **Wrong branch**
   ```bash
   git stash
   git checkout correct-branch
   git stash pop
   ```

3. **Undo last commit**
   ```bash
   git reset --soft HEAD~1  # Keep changes staged
   git reset --hard HEAD~1  # Discard changes
   ```

### Emergency Procedures

1. **Hotfix Process**
   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   # Make urgent fix
   git commit -m "fix(critical): urgent security patch"
   git checkout main
   git merge hotfix/critical-fix
   git tag -a v1.0.1 -m "Hotfix release"
   git checkout develop
   git merge hotfix/critical-fix
   git branch -d hotfix/critical-fix
   ```

## Tools and Integrations

### Recommended Tools
- **GitHub Desktop** - Visual Git client
- **VS Code Git** - Integrated Git in VS Code
- **GitKraken** - Advanced Git GUI
- **SourceTree** - Free Git client

### CI/CD Integration
- Automated testing on pull requests
- Build verification before merge
- Deployment automation for main branch

## Security

### Sensitive Data
- Never commit `.env` files
- Use environment variables for secrets
- Review all files before committing
- Use `.gitignore` effectively

### Access Control
- Protect main and develop branches
- Require pull request reviews
- Use branch protection rules
- Limit direct pushes to main

---

**Remember:** Good Git practices lead to better collaboration and code quality!
