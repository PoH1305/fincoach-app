import { describe, it, expect } from 'vitest'
import { encodeBase64 } from '../lib/base64'

describe('encodeBase64', () => {
  it('encodes a utf8 string', () => {
    expect(encodeBase64('hello')).toBe('aGVsbG8=')
  })

  it('encodes a Uint8Array', () => {
    const arr = new Uint8Array([104,101,108,108,111])
    expect(encodeBase64(arr)).toBe('aGVsbG8=')
  })

  it('encodes an ArrayBuffer', () => {
    const buf = new ArrayBuffer(5)
    const view = new Uint8Array(buf)
    view.set([104,101,108,108,111])
    expect(encodeBase64(buf)).toBe('aGVsbG8=')
  })

  it('encodes a number array', () => {
    expect(encodeBase64([104,101,108,108,111])).toBe('aGVsbG8=')
  })

  it('encodes an object by JSON-stringifying', () => {
    const obj = { a: 1 }
    const encoded = encodeBase64(obj)
    // should be base64 of JSON.stringify({ a: 1 })
    expect(encoded).toBe(Buffer.from(JSON.stringify(obj), 'utf8').toString('base64'))
  })
})
