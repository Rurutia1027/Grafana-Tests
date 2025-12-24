# Grafana-Playwright-Test

## Purpose and Motivation 
This repository is **not** a fork of Grafana. Instead, it is a **learning-driven reimplementation** of Grafana's production-grade testing framework, built on its **open-source codebase**.

The primary goals are: 
- To deeply understand how **Grafana**, a mature enterprised-level product, structures and executes its **test strategy**.
- To study **real-world CI/CD practices**, environment bootstraping, and test orchestration used by Grafana.
- To re-implement and adapt Grafana's test cases into a **standalone**, **reusable testing framework**.
- To provide **high-quality reference** material for designing E2E, integration, and system tests for cloud-native platforms.

This repository should be treated as **educational and experimental**, with strong emphasis on architecture, patterns, and practices rather than feature parity.


## High-Level Strategy 
The workflow of this repository follows four major phases:
- Study Grafana's Open-Source Test Code
- Extract and Copy Test Case Sources into this repository
- Rewrite and refactor the tests to:
  > Remove Grafana-internal coupling
  > Improve readability and modularity
  > Align with generic enterprise testing practices
- Rebuild the Supporting Infrastructure:
  > CI scripts
  > Environment provisioning
  > E2E context bootstraping

The result is a **clean**, **production-inspired test framework** that mirrors how Grafana validates its product in real environments. 


## Scope of Testing
This repository focuses primarily on **End-to-End(E2E)** and **Integration-level** testing, with selective coverage of:
- UI behavior (dashboards, panels, navigation)
- Authentication and authorization flows
- API-driven workflows
- Configuration and provisioning validation
- Upgrade and migration scenarios

Unit tests are **explicitly out of scope** unless they are required to support E2E flows.

## Repository Structure 

//  TODO

## Copying and Rewriting Grafana Test Sources 
### Source of Truth
Grafana's official open-source repository:
- UI tests
- Backend integration tests
- CI workflows

These serve as the **reference implementation**, not a dependency.


### Rewrite Principles
All copied test cases are:
- **Manualy rewritten**, not bindly duplicated
- Decoupled from Grafana-internal build tools
- Refactored to:
  > Improve naming clarity
  > Reduce implicit global state
  > Make environment assumptions explicit

The intent is to **preserve behavior**, not implementation details.

## Intended Audience

This repository is designed for:

- Engineers studying enterprise‑level test frameworks
- Platform and SRE engineers validating observability stacks
- Developers designing E2E strategies for cloud‑native products

It is not intended as a drop‑in Grafana testing solution.


## Next Steps
- Complete analysis of Grafana’s E2E test suites
- Implement the first rewritten test flows
- Stabilize CI execution
- Expand documentation with concrete examples
