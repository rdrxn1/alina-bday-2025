import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdownComponents = {
  p: ({ children }) => (
    <p className="mb-6 font-terminal text-2xl leading-relaxed text-white/80">{children}</p>
  ),
  strong: ({ children }) => <strong className="text-desktop-glow">{children}</strong>,
  em: ({ children }) => <em className="text-desktop-rose">{children}</em>,
  h2: ({ children }) => (
    <h2 className="mb-6 mt-10 font-pixel text-lg uppercase tracking-[0.35em] text-desktop-mint">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-4 mt-8 font-pixel text-sm uppercase tracking-[0.45em] text-white/70">
      {children}
    </h3>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 list-[square] space-y-3 pl-6 font-terminal text-2xl leading-relaxed text-white/80">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-3 pl-6 font-terminal text-2xl leading-relaxed text-white/80">
      {children}
    </ol>
  ),
}

function LetterContent({ markdownSrc }) {
  const [state, setState] = useState({ loading: true, error: null, markdown: '' })

  useEffect(() => {
    let isMounted = true

    async function loadMarkdown() {
      if (!markdownSrc) {
        setState({ loading: false, error: new Error('Letter not found'), markdown: '' })
        return
      }

      try {
        const response = await fetch(markdownSrc)
        if (!response.ok) {
          throw new Error(`Unable to load letter (${response.status})`)
        }
        const text = await response.text()

        if (isMounted) {
          setState({ loading: false, error: null, markdown: text })
        }
      } catch (error) {
        if (!isMounted) {
          return
        }
        setState({ loading: false, error, markdown: '' })
      }
    }

    loadMarkdown()

    return () => {
      isMounted = false
    }
  }, [markdownSrc])

  if (state.loading) {
    return (
      <div className="rounded-xl border-2 border-white/12 bg-black/30 p-10 text-center font-terminal text-xl text-white/70 shadow-bezel">
        Loading letter...
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="rounded-xl border-2 border-white/12 bg-black/30 p-10 text-center font-terminal text-xl text-desktop-rose shadow-bezel">
        Couldn't open the letter right now.
      </div>
    )
  }

  return (
    <div className="relative max-h-[70vh] overflow-y-auto rounded-2xl border-2 border-white/12 bg-desktop-shell/90 p-10 text-left shadow-crt">
      <article className="relative">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {state.markdown}
        </ReactMarkdown>
      </article>
    </div>
  )
}

export default LetterContent
