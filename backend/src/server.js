import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/database.js";

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "127.0.0.1";

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Create uploads directory if it doesn't exist
    import("fs").then(({ mkdirSync, existsSync }) => {
      const uploadsDir = "./uploads";
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
        console.log(`📁 Created uploads directory`);
      }
    });

    // Start server
    const server = app.listen(PORT, HOST, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Dayflow HRMS Backend Server                          ║
║                                                            ║
║   ✅ Server running on: http://${HOST}:${PORT}            ║
║   ✅ Environment: ${
        process.env.NODE_ENV || "development"
      }                      ║
║   ✅ Database: ${
        process.env.MONGODB_URI || "mongodb://localhost:27017/hrms_dayflow"
      } ║
║                                                            ║
║   📚 API Documentation:                                   ║
║      Base URL: http://localhost:${PORT}/api               ║
║      Auth: /auth (signup, signin, me, logout)            ║
║      Employees: /employees                               ║
║      Attendance: /attendance                             ║
║      Leaves: /leaves                                     ║
║      Salaries: /salaries                                 ║
║                                                            ║
║   Press Ctrl+C to stop                                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("⚠️  SIGTERM signal received: closing HTTP server");
      server.close(() => {
        console.log("✅ HTTP server closed");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("\n⚠️  SIGINT signal received: closing HTTP server");
      server.close(() => {
        console.log("✅ HTTP server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`❌ Server startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
