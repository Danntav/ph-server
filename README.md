# ESP32 pH Monitor (Cloud-Based)

This project collects pH data from multiple ESP32 devices and stores it in a cloud database. It includes:

- 📡 **FastAPI backend** (deployed on Railway)
- 🗃️ **PostgreSQL database** (via Supabase)
- 📊 **Streamlit dashboard** to view data

---

## How It Works

```
ESP32 ──(HTTP POST)──▶ FastAPI ──▶ Supabase ──▶ Streamlit
```

---

## Steps to Deploy

### 1. Supabase (Database)
- Create a project at https://supabase.com
- Add a table with:
```sql
CREATE TABLE ph_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT,
  ph FLOAT,
  timestamp TIMESTAMP
);
```
- Copy your database URL (DB_URL)

### 2. FastAPI Backend
- Push `main.py` and `requirements.txt` to GitHub
- Deploy to [Railway](https://railway.app)
- Set the `DB_URL` environment variable

### 3. ESP32 Device
Send data like this:
```cpp
HTTPClient http;
http.begin("https://your-app.up.railway.app/submit");
http.addHeader("Content-Type", "application/json");
http.POST("{\"device_id\":\"esp01\", \"ph\":6.9}");
http.end();
```

### 4. Streamlit Dashboard
- Push `app.py` and `requirements.txt` to GitHub
- Deploy to [Streamlit Cloud](https://streamlit.io/cloud)
- Set the same `DB_URL` as env variable

---

You're done! Streamlit will show your pH data live from the ESP32s.
