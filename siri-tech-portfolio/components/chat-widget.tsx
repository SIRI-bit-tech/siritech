"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

declare global {
  interface Window {
    smartsupp?: (action: string, data?: unknown) => void
  }
}

export default function ChatWidget() {
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [isSmartSuppLoaded, setIsSmartSuppLoaded] = useState(false)

  useEffect(() => {
    // Check if Smartsupp is loaded
    const checkSmartSupp = () => {
      if (window.smartsupp) {
        setIsSmartSuppLoaded(true)
      } else {
        setTimeout(checkSmartSupp, 1000)
      }
    }
    checkSmartSupp()
  }, [])

  const toggleChat = () => {
    if (window.smartsupp) {
      if (isChatVisible) {
        window.smartsupp("chat:close")
      } else {
        window.smartsupp("chat:open")
      }
      setIsChatVisible(!isChatVisible)
    }
  }

  const openChat = () => {
    if (window.smartsupp) {
      window.smartsupp("chat:open")
      setIsChatVisible(true)
    }
  }

  if (!isSmartSuppLoaded) {
    return null
  }

  return (
    <>
      {/* Custom Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-accent hover:scale-110"
          aria-label="Toggle chat"
        >
          {isChatVisible ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Prompt Banner */}
      {!isChatVisible && (
        <div className="fixed bottom-24 right-6 z-40 max-w-sm">
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 animate-bounce">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">Hi there! 👋</p>
                <p className="text-xs text-muted-foreground mb-2">
                  Have questions about my work or want to discuss a project?
                </p>
                <Button size="sm" onClick={openChat} className="text-xs">
                  Start Chat
                </Button>
              </div>
              <button
                onClick={() => setIsChatVisible(true)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close chat prompt"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
