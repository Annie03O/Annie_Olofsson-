import { Request, Response, NextFunction } from 'express'

// Middleware function to log request details
// This function logs the current date, HTTP method, and URL of incoming requests
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const currentDate = new Date().toISOString()
  console.log(`[${currentDate}] ${req.method} ${req.url}`)

  next()
}