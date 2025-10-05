import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Adzuna job search endpoint
  app.post("/api/jobs/search", async (req, res) => {
    try {
      const { skills, location = "india" } = req.body;

      if (!skills || skills.length === 0) {
        return res.status(400).json({ error: "Skills are required" });
      }

      const appId = process.env.ADZUNA_APP_ID;
      const apiKey = process.env.ADZUNA_API_KEY;

      if (!appId || !apiKey) {
        return res.status(500).json({ error: "Adzuna API credentials not configured" });
      }

      // Build search query from skills - use first few skills for better results
      const query = skills.slice(0, 3).join(" ");
      const country = "in"; // India

      // Adzuna API endpoint - remove location filter if it's too restrictive
      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${apiKey}&results_per_page=20&what=${encodeURIComponent(query)}&content-type=application/json`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Adzuna API error: ${response.status}`);
      }

      const data = await response.json();

      // Transform Adzuna response to match our JobMatch interface
      const jobs = data.results.map((job: any, index: number) => ({
        id: job.id || `job-${index}`,
        title: job.title,
        company: job.company?.display_name || "Company not specified",
        location: job.location?.display_name || location,
        salary: job.salary_min && job.salary_max 
          ? `₹${Math.round(job.salary_min / 100000)}-${Math.round(job.salary_max / 100000)} LPA`
          : job.salary_min
          ? `₹${Math.round(job.salary_min / 100000)}+ LPA`
          : undefined,
        description: job.description || "No description available",
        url: job.redirect_url,
        matchScore: undefined, // We'll calculate this on the frontend based on skill matching
      }));

      res.json({ jobs, total: data.count });
    } catch (error: any) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: error.message || "Failed to fetch jobs" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
