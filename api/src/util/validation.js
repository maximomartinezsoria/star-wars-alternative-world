import { UserInputError, AuthenticationError } from 'apollo-server-koa'

export function validateUserIsLoggedIn(user) {
  if (user) return true
  throw new AuthenticationError('You must provide a valid token')
}

export function validateUserInfo(userInfo) {
  if (
    String(userInfo.username) &&
    userInfo.username.length > 0 &&
    String(userInfo.password) &&
    userInfo.password.length > 0
  )
    return true
  throw new UserInputError('You must provide an username and a password')
}

export function validatePositiveInteger(number, fieldName) {
  if (number > 0) return true
  throw new UserInputError(`${fieldName} must be a positive integer`)
}

function validatePageSize(pageSize) {
  const pageSizeValidation = pageSize > 0 && pageSize <= 100
  if (pageSizeValidation) return true
  throw new UserInputError(
    'PageSize must be a positive integer less than or equal to 100'
  )
}

export function validatePagination(page, pageSize) {
  validatePositiveInteger(page, 'page')
  validatePageSize(pageSize)
  return true
}

export function validateDate(date, fieldName) {
  if (!date) return true
  const dateObj = new Date(date)
  const fullISODate = `${date}T00:00:00.000Z`
  if (
    typeof date === 'string' &&
    date.match(/\d{4}-\d{2}-\d{2}/) &&
    dateObj.toISOString() === fullISODate
  )
    return true

  throw new UserInputError(
    `${fieldName} must follow this pattern: yyyy-mm-dd, and be a valid date`
  )
}
