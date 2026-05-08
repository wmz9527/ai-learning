import { Router, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as userStore from './userStore.js'
import { authMiddleware, type AuthRequest } from './middleware/auth.js'

const router = Router()

// POST /register
router.post('/register', async (req: AuthRequest, res: Response) => {
  const { username, password } = req.body as {
    username?: string
    password?: string
  }

  if (!username || !password) {
    res.status(400).json({ code: 400, message: '召唤师名称和符文密语不能为空', data: null })
    return
  }
  if (username.length < 2 || username.length > 16) {
    res.status(400).json({ code: 400, message: '召唤师名称长度为 2-16 个字符', data: null })
    return
  }
  if (password.length < 6) {
    res.status(400).json({ code: 400, message: '符文密语长度至少 6 位', data: null })
    return
  }

  if (userStore.findByUsername(username)) {
    res.status(409).json({ code: 409, message: '召唤师名称已被占用', data: null })
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = userStore.createUser(username, passwordHash)

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )

  res.json({
    code: 200,
    message: '注册成功，欢迎来到召唤师峡谷！',
    data: {
      token,
      user: { id: user.id, username: user.username },
    },
  })
})

// POST /login
router.post('/login', async (req: AuthRequest, res: Response) => {
  const { username, password } = req.body as {
    username?: string
    password?: string
  }

  if (!username || !password) {
    res.status(400).json({ code: 400, message: '请输入召唤师名称和符文密语', data: null })
    return
  }

  const user = userStore.findByUsername(username)
  if (!user) {
    res.status(401).json({ code: 401, message: '召唤师名称或符文密语错误', data: null })
    return
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    res.status(401).json({ code: 401, message: '召唤师名称或符文密语错误', data: null })
    return
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )

  res.json({
    code: 200,
    message: '欢迎回来，召唤师！',
    data: {
      token,
      user: { id: user.id, username: user.username },
    },
  })
})

// GET /me — 验证 token 有效性
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({
    code: 200,
    message: 'ok',
    data: { user: req.user },
  })
})

export default router
