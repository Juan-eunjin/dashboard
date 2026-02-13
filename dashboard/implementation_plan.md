# Dashboard Code Refactoring — Extract Constants & Improve Readability

The `JiraApiService` currently has hardcoded Jira API map keys (`"key"`, `"fields"`, `"status"`, `"name"`, etc.), hardcoded API paths (`/rest/api/3/search/jql`), and inline error messages. The user wants these extracted into separate, manageable classes. Additional readability fixes are also included.

## Proposed Changes

### Constants Layer (new package: `common`)

#### [NEW] [JiraFieldKey.java](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/java/com/example/dashboard/common/JiraFieldKey.java)

Constants for Jira API JSON map keys. Eliminates all magic strings used when parsing the Jira response `Map`.

```java
// Examples of constants:
ISSUES, KEY, FIELDS, SUMMARY, STATUS, NAME,
ASSIGNEE, DISPLAY_NAME, LABELS, CREATED, DUEDATE
```

#### [NEW] [JiraApiPath.java](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/java/com/example/dashboard/common/JiraApiPath.java)

Constants for Jira REST API paths and query parameters. Currently hardcoded in `JiraApiService.fetchAndSaveJiraIssues()`.

```java
// Examples:
SEARCH_JQL_PATH = "/rest/api/3/search/jql"
DEFAULT_PROJECT_JQL = "project='KAN'"
DEFAULT_FIELDS = "status,created,duedate,summary,assignee,labels"
```

#### [NEW] [LogMessages.java](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/java/com/example/dashboard/common/LogMessages.java)

Centralized log/error messages used throughout the application.

```java
// Examples:
API_REQUEST_FAILED = "Jira API 요청 실패: {}"
NO_ISSUES_FOUND = "경고: Jira에서 가져온 이슈가 없습니다."
ISSUES_FETCHED = "가져온 이슈 개수: {}"
SYNC_START = "Jira 데이터 동기화 시작..."
SYNC_COMPLETE = "동기화 완료!"
```

---

### Service Layer

#### [MODIFY] [JiraApiService.java](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/java/com/example/dashboard/service/JiraApiService.java)

- Replace all magic string keys (`"issues"`, `"key"`, `"fields"`, `"status"`, `"name"`, etc.) with `JiraFieldKey.*`
- Replace hardcoded API path & query params with `JiraApiPath.*`
- Replace inline error message `APIRequestFail` with `LogMessages.API_REQUEST_FAILED`
- Use `@Value("${jira.api.email}")` instead of hardcoding `"eunjinshin97@gmail.com"`
- Switch from `System.out.println` / `System.err.println` to SLF4J `@Slf4j` logging
- Add `@RequiredArgsConstructor` pattern consideration (keep constructor injection but cleaner)

#### [DELETE] [JiraApiServiceOld.java](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/java/com/example/dashboard/service/JiraApiServiceOld.java)

The entire file is commented out and unused. Delete it to keep the codebase clean.

---

### Controller Layer

#### [MODIFY] [SearchController.java](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/java/com/example/dashboard/controller/SearchController.java)

- Remove duplicate `import com.example.dashboard.service.JiraApiService` (line 11)
- Fix `JiraApiService` injection — currently missing `@Autowired`, will cause NPE at runtime
- Use constructor injection (`@RequiredArgsConstructor`) instead of field injection for consistency

---

### Config Layer

#### [MODIFY] [DataInitializer.java](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/java/com/example/dashboard/config/DataInitializer.java)

- Replace `System.out.println` with SLF4J `@Slf4j` logging
- Use `LogMessages.*` constants for sync start/complete messages

---

### Application Config

#### [MODIFY] [application.yaml](file:///c:/Users/user/Desktop/01.Reservation_page/dashboard/src/main/resources/application.yaml)

- Add `jira.api.email` property (currently the email is hardcoded in `JiraApiService`)

## Verification Plan

### Automated Tests

Run the Gradle build to verify compilation and existing tests:

```bash
cd c:\Users\user\Desktop\01.Reservation_page\dashboard
.\gradlew.bat clean build
```

> [!NOTE]
> The project only has a single context-load test. Since this refactoring is a structural change (extracting constants, fixing DI), the compilation check is the primary automated verification. The existing `DashboardApplicationTests.contextLoads()` test will confirm Spring context wires correctly.

### Manual Verification

Since the application depends on a live Jira API token and MySQL database, full runtime testing requires the user's environment. Please verify by:

1. Start the application (`.\gradlew.bat bootRun`)
2. Confirm the Jira sync runs at startup without errors
3. Hit `http://localhost:8080/` and confirm "Jira Dashboard API Server is running!"
