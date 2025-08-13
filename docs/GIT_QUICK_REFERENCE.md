# Portfolio Tool - Git Quick Reference

## 🚀 Quick Start Commands

### Daily Workflow
```bash
# Start new feature
./scripts/git-helper.sh start-feature feature-name

# Check status
./scripts/git-helper.sh status

# Finish feature
./scripts/git-helper.sh finish-feature

# Clean up branches
./scripts/git-helper.sh cleanup
```

### Manual Git Commands
```bash
# Basic workflow
git checkout develop
git pull origin develop
git checkout -b feature/your-feature
# ... make changes ...
git add .
git commit -m "feat(scope): description"
git push origin feature/your-feature
```

## 📝 Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Build/tooling

### Scopes
- `dashboard` - Dashboard components
- `import` - Data import
- `network` - Network visualization
- `ui` - User interface
- `api` - Backend API
- `auth` - Authentication
- `deps` - Dependencies

### Examples
```bash
git commit -m "feat(dashboard): add real-time metrics"
git commit -m "fix(import): resolve CSV parsing error"
git commit -m "docs(readme): update installation guide"
git commit -m "style(ui): improve button spacing"
```

## 🌿 Branch Strategy

### Main Branches
- `main` - Production code
- `develop` - Integration branch

### Working Branches
- `feature/name` - New features
- `fix/description` - Bug fixes
- `hotfix/urgent` - Critical fixes
- `docs/update` - Documentation

## 🔧 Common Operations

### Starting Work
```bash
# New feature
git checkout develop
git pull origin develop
git checkout -b feature/feature-name

# Hotfix
git checkout main
git pull origin main
git checkout -b hotfix/urgent-fix
```

### During Development
```bash
# Check status
git status
git log --oneline -5

# Stage changes
git add .
git add specific-file.tsx

# Commit
git commit -m "type(scope): description"

# Push
git push origin branch-name
```

### Finishing Work
```bash
# Feature → Develop
git checkout develop
git pull origin develop
git merge feature/feature-name --no-ff
git branch -d feature/feature-name

# Hotfix → Main
git checkout main
git merge hotfix/urgent-fix --no-ff
git tag -a v1.0.1 -m "Hotfix release"
git checkout develop
git merge hotfix/urgent-fix
git branch -d hotfix/urgent-fix
```

## 🚨 Emergency Commands

### Undo Last Commit
```bash
git reset --soft HEAD~1  # Keep changes staged
git reset --hard HEAD~1  # Discard changes
```

### Stash Changes
```bash
git stash                 # Stash changes
git stash pop            # Restore changes
git stash list           # List stashes
```

### Fix Wrong Branch
```bash
git stash
git checkout correct-branch
git stash pop
```

### Reset to Remote
```bash
git fetch origin
git reset --hard origin/main
```

## 🏷️ Version Management

### Create Release
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### List Tags
```bash
git tag -l
git tag -l "v1.*"
```

### Delete Tag
```bash
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

## 🔍 Useful Commands

### View History
```bash
git log --oneline          # Compact view
git log --graph --all      # Visual graph
git log -p filename        # Show changes
git blame filename         # Who changed what
```

### Compare Changes
```bash
git diff                   # Working directory vs staged
git diff --staged          # Staged vs last commit
git diff HEAD~1            # Current vs previous commit
git diff branch1..branch2  # Between branches
```

### Branch Management
```bash
git branch -a              # List all branches
git branch -d branch-name  # Delete branch
git branch -m new-name     # Rename branch
git checkout -b new-branch # Create and switch
```

## 🛠️ Helper Script Commands

```bash
./scripts/git-helper.sh start-feature feature-name
./scripts/git-helper.sh finish-feature
./scripts/git-helper.sh start-hotfix description
./scripts/git-helper.sh finish-hotfix
./scripts/git-helper.sh status
./scripts/git-helper.sh cleanup
./scripts/git-helper.sh help
```

## 📋 Pre-commit Checklist

- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] No console errors
- [ ] Commit message follows convention
- [ ] No sensitive data in commit
- [ ] Changes are focused and atomic

## 🔐 Security Notes

- Never commit `.env` files
- Use environment variables for secrets
- Review all files before committing
- Check for API keys or passwords

---

**Need help?** Check `docs/GIT_WORKFLOW.md` for detailed information.
