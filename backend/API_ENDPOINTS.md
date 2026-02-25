# API Endpoints

## 1. Register User

**POST** `/users/register`

**Body:**

```json
{
  "uid": "string", // Firebase UID
  "profile": {
    "displayName": "string (optional)",
    "photoURL": "string (optional)"
  }
}
```

- Registers a user, sets `username` to their email.

---

## 2. Get Prompt of the Day

**GET** `/prompts/today?date=YYYY-MM-DD`

**Query Param (optional):**

- `date`: string (defaults to today if not provided)

**Returns:**

- The prompt for the given date.

---

## 3. Create Prompt (Admin)

**POST** `/prompts`

**Body:**

```json
{
  "date": "YYYY-MM-DD",
  "question": "string"
}
```

- Creates or updates the prompt for a specific date.

---

## 4. Submit Answer

**POST** `/answers/submit`

**Headers:**

- `Authorization: Bearer <Firebase ID Token>`

**Body:**

```json
{
  "promptDate": "YYYY-MM-DD",
  "answer": "string"
}
```

- Submits an answer for the current user for the given prompt date.

---

## 5. List Friends

**GET** `/friends/list`

**Headers:**

- `Authorization: Bearer <Firebase ID Token>`

**Returns:**

- Array of friend UIDs or friend records.

---

## 6. Friends with Stats

**GET** `/friends/with-stats`

**Headers:**

- `Authorization: Bearer <Firebase ID Token>`

**Returns:**

- Array of friend records with stats.

---

## 7. Add Friend by Username

**POST** `/friends/add`

**Headers:**

- `Authorization: Bearer <Firebase ID Token>`

**Body:**

```json
{
  "username": "string" // The friend's email (used as username)
}
```

- Adds a friend by their username (email).

---

Let me know if you need details for any other endpoints or want example curl requests!
