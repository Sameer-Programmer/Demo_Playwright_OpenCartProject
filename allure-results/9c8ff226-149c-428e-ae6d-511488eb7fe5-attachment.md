# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#content"
  - generic [ref=e3]:
    - banner
    - generic [ref=e8]:
      - heading "This page doesn't seem to exist." [level=1] [ref=e10]
      - generic [ref=e11]:
        - heading "It looks like the link pointing here was faulty. Maybe try searching?" [level=3] [ref=e12]
        - search [ref=e15]:
          - generic [ref=e16]:
            - generic [ref=e17]: "Search for:"
            - 'searchbox "Search for: Search Submit" [ref=e18]'
            - button "Search Submit" [ref=e19] [cursor=pointer]:
              - img [ref=e22]
          - button "Search" [ref=e24] [cursor=pointer]
    - contentinfo [ref=e25]:
      - paragraph [ref=e32]:
        - text: Copyright © 2026 Tutorialsninja | Powered by
        - link "Astra WordPress Theme" [ref=e33] [cursor=pointer]:
          - /url: https://wpastra.com/
```