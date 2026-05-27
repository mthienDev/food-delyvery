/**
 * useDragScroll — enable mouse drag-to-scroll for horizontal containers.
 * Mobile: touch scrolls natively. Desktop: click-and-drag to scroll.
 *
 * isDragging: true khi user đã kéo > 5px — dùng để phân biệt click vs drag
 * ở parent (ngăn navigate khi đang scroll).
 */
import { useRef, useCallback } from 'react'

export default function useDragScroll() {
  const ref = useRef(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })

  const onMouseDown = useCallback((e) => {
    const el = ref.current
    if (!el) return
    drag.current = { active: true, startX: e.pageX, scrollLeft: el.scrollLeft, moved: false }
    el.style.cursor = 'grabbing'
    el.style.userSelect = 'none'
  }, [])

  const onMouseUp = useCallback(() => {
    drag.current.active = false
    if (!ref.current) return
    ref.current.style.cursor = 'grab'
    ref.current.style.userSelect = ''
    // Reset moved sau một tick để click handler đọc được giá trị đúng
    setTimeout(() => { drag.current.moved = false }, 0)
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!drag.current.active || !ref.current) return
    e.preventDefault()
    const delta = e.pageX - drag.current.startX
    if (Math.abs(delta) > 5) drag.current.moved = true
    ref.current.scrollLeft = drag.current.scrollLeft - delta
  }, [])

  return {
    ref,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseLeave: onMouseUp,
    style: { cursor: 'grab' },
    /** Gọi trong event handler (không phải render) để check có đang drag không */
    isDragging: () => drag.current.moved,
  }
}
