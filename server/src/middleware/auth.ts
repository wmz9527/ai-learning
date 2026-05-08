import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  user?: { id: string; username: string }
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ code: 401, message: '请先登录', data: null })
    return
  }

  try {
    const token = header.split(' ')[1]!
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      username: string
    }
    req.user = { id: payload.id, username: payload.username }
    next()
  } catch {
    res.status(401).json({ code: 401, message: '登录已过期，请重新登录', data: null })
  }
}
