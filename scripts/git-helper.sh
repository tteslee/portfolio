#!/bin/bash

# Portfolio Tool - Git Helper Script
# Usage: ./scripts/git-helper.sh [command] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
}

# Function to check if there are uncommitted changes
check_uncommitted_changes() {
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes"
        git status --short
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Function to start a new feature
start_feature() {
    if [ -z "$1" ]; then
        print_error "Feature name is required"
        echo "Usage: $0 start-feature <feature-name>"
        exit 1
    fi
    
    check_git_repo
    check_uncommitted_changes
    
    local feature_name=$1
    local branch_name="feature/$feature_name"
    
    print_header "Starting new feature: $feature_name"
    
    # Switch to develop and pull latest changes
    print_status "Switching to develop branch..."
    git checkout develop
    git pull origin develop
    
    # Create and switch to feature branch
    print_status "Creating feature branch: $branch_name"
    git checkout -b "$branch_name"
    
    print_status "Feature branch created successfully!"
    print_status "You can now start developing your feature"
}

# Function to finish a feature
finish_feature() {
    check_git_repo
    
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch =~ ^feature/ ]]; then
        print_error "Not on a feature branch"
        exit 1
    fi
    
    print_header "Finishing feature: $current_branch"
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        print_error "You have uncommitted changes. Please commit or stash them first."
        exit 1
    fi
    
    # Switch to develop and merge
    print_status "Switching to develop branch..."
    git checkout develop
    git pull origin develop
    
    print_status "Merging feature branch..."
    git merge "$current_branch" --no-ff -m "feat: merge $current_branch"
    
    # Delete feature branch
    print_status "Deleting feature branch..."
    git branch -d "$current_branch"
    
    print_status "Feature completed successfully!"
}

# Function to create a hotfix
start_hotfix() {
    if [ -z "$1" ]; then
        print_error "Hotfix description is required"
        echo "Usage: $0 start-hotfix <description>"
        exit 1
    fi
    
    check_git_repo
    check_uncommitted_changes
    
    local description=$1
    local branch_name="hotfix/$description"
    
    print_header "Starting hotfix: $description"
    
    # Switch to main and pull latest changes
    print_status "Switching to main branch..."
    git checkout main
    git pull origin main
    
    # Create and switch to hotfix branch
    print_status "Creating hotfix branch: $branch_name"
    git checkout -b "$branch_name"
    
    print_status "Hotfix branch created successfully!"
    print_status "Make your urgent fix and then run: $0 finish-hotfix"
}

# Function to finish a hotfix
finish_hotfix() {
    check_git_repo
    
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch =~ ^hotfix/ ]]; then
        print_error "Not on a hotfix branch"
        exit 1
    fi
    
    print_header "Finishing hotfix: $current_branch"
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        print_error "You have uncommitted changes. Please commit them first."
        exit 1
    fi
    
    # Get version from user
    read -p "Enter version number (e.g., 1.0.1): " version
    
    # Switch to main and merge
    print_status "Switching to main branch..."
    git checkout main
    git pull origin main
    
    print_status "Merging hotfix to main..."
    git merge "$current_branch" --no-ff -m "fix: merge $current_branch"
    
    # Tag the release
    print_status "Creating release tag: v$version"
    git tag -a "v$version" -m "Release version $version"
    
    # Switch to develop and merge
    print_status "Switching to develop branch..."
    git checkout develop
    git pull origin develop
    
    print_status "Merging hotfix to develop..."
    git merge "$current_branch" --no-ff -m "fix: merge $current_branch"
    
    # Delete hotfix branch
    print_status "Deleting hotfix branch..."
    git branch -d "$current_branch"
    
    print_status "Hotfix completed successfully!"
    print_status "Don't forget to push tags: git push origin v$version"
}

# Function to show current status
show_status() {
    check_git_repo
    
    print_header "Git Status"
    
    echo "Current branch: $(git branch --show-current)"
    echo "Last commit: $(git log -1 --oneline)"
    
    echo
    print_status "Recent commits:"
    git log --oneline -5
    
    echo
    print_status "Branch status:"
    git status --short
}

# Function to clean up branches
cleanup_branches() {
    check_git_repo
    
    print_header "Cleaning up merged branches"
    
    # Switch to develop
    git checkout develop
    git pull origin develop
    
    # Delete merged feature branches
    print_status "Deleting merged feature branches..."
    git branch --merged develop | grep '^  feature/' | xargs -n 1 git branch -d || true
    
    # Delete merged hotfix branches
    print_status "Deleting merged hotfix branches..."
    git branch --merged main | grep '^  hotfix/' | xargs -n 1 git branch -d || true
    
    print_status "Cleanup completed!"
}

# Function to show help
show_help() {
    echo "Portfolio Tool - Git Helper Script"
    echo
    echo "Usage: $0 [command] [options]"
    echo
    echo "Commands:"
    echo "  start-feature <name>    Start a new feature branch"
    echo "  finish-feature          Finish current feature branch"
    echo "  start-hotfix <desc>     Start a new hotfix branch"
    echo "  finish-hotfix           Finish current hotfix branch"
    echo "  status                  Show current git status"
    echo "  cleanup                 Clean up merged branches"
    echo "  help                    Show this help message"
    echo
    echo "Examples:"
    echo "  $0 start-feature user-authentication"
    echo "  $0 start-hotfix critical-security-patch"
    echo "  $0 status"
}

# Main script logic
case "${1:-help}" in
    "start-feature")
        start_feature "$2"
        ;;
    "finish-feature")
        finish_feature
        ;;
    "start-hotfix")
        start_hotfix "$2"
        ;;
    "finish-hotfix")
        finish_hotfix
        ;;
    "status")
        show_status
        ;;
    "cleanup")
        cleanup_branches
        ;;
    "help"|*)
        show_help
        ;;
esac
