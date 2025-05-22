# Flight search

This document provides a high-level introduction to the Flight Search Application, a full-stack web application that enables users to search for and view flight offers from external aviation APIs.
The system consists of a React-based frontend served on port 8080 and a Spring Boot backend API running on port 9090, with integrated caching and external API orchestration capabilities.

## Core Technology Stack

|Component|Technology|Version|Link|
|--|--|--|--|
|**Frontend Runtime**|Node.js|20 (Alpine)|[https://nodejs.org/](https://nodejs.org/)|
|**Frontend Build Tool**|Vite|6.3.1|[https://vitejs.dev/](https://vitejs.dev/)|
|**Backend Runtime**|OpenJDK|21|[https://openjdk.org/projects/jdk/21/](https://openjdk.org/projects/jdk/21/)|
|**Backend Framework**  |Spring Boot|3.4.5|[https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)|
|**Build Tool (Backend)**|Gradle|(via wrapper)|[https://gradle.org/](https://gradle.org/)|
|**Containerization**|Docker|Latest|[https://www.docker.com/](https://www.docker.com/)|
|**Container Orchestration**|Docker Compose|4.2|[https://docs.docker.com/compose/](https://docs.docker.com/compose/)|

## Application architecture

<img width="998" alt="image" src="https://github.com/user-attachments/assets/a67aeccb-b7f2-4653-8bd3-804d04aa6c41" />


## Complete Installation and Deployment Instructions

### Prerequisites
1. **Git** installed on your system
2. **Docker and Docker Compose** installed on your system
3. **Java 21** for building the backend JAR
4. **Gradle** for backend build process

### Step-by-Step Installation

#### 1. Clone the Repository
Use your favorite terminal option and locate on the directory wished to download the project and clone the repository using the next commands:
```bash
git clone https://github.com/santiagoOrozco-encora/Breakable-Toy-II.git
cd Breakable-Toy-II
```

#### 2. Build the Backend JAR
Before running Docker Compose, you must build the Spring Boot application:
```bash
./gradlew build
```
This creates the required JAR file at `build/libs/BackEnd-0.0.1-SNAPSHOT.jar`

#### 3. Deploy with Docker Compose
Run the complete application stack:
```bash
docker-compose up --build
```

This command will:
- Build the backend container from `./BackEnd` context
- Build the frontend container from `./frontend` context with multi-stage build
- Create the `app-network` bridge network
- Start both services with health checks

#### 4. Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:9090 

### Container Details

**Backend Container**:
- Runs with `SPRING_PROFILES_ACTIVE=dev` environment
- Health check via `/actuator/health` endpoint 

**Frontend Container**:
- Multi-stage build: Node.js build stage + Nginx production stage
- Health check via HTTP request to port 8080 

### Optional: Development Mode
For development with file watching:
```bash
docker-compose up --build -d
```

### Stopping the Application
```bash
docker-compose down
```

## External API Integration

The system integrates with two external APIs using a primary/fallback pattern:

|API|Purpose|Implementation|Fallback Behavior|
|--|--|--|--|
| Amadeus | Primary flight and airport data |`AmadeousFlightApiServiceImpl`|OAuth2 token-based auth
| Ninja API | Backup airport search |``NinjaServiceImp``|Used when Amadeus fails

## Type Definition System
The frontend uses a comprehensive TypeScript type system to ensure type safety across all API interactions. The types are organized in a hierarchical structure that mirrors the backend data models.

### Core API Types
|Type|Purpose|Key Fields|
|--|--|--|
|`FlightSearch`|Search request parameters|`originLocationCode`,  `destinationLocationCode`,  `departureDate`,`FlightOffer`|
|`FlightOffer`|Complete search response|`offers[]`,  `dictionaryDTO`,  `size`|
|`SelectOption`|Airport selection data|`value`,  `label`|
|`Airport`|Airport information|`name`,  `iataCode`,  `address`|


