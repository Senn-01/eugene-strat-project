# Project Creation Modal Wireframe

```
                ┌───────────────────────────────────────────────────────────────────────────────┐
                │                               MODAL OVERLAY                                   │
                │  ┌─────────────────────────────────────────────────────────────────────────┐  │
                │  │ CREATE NEW PROJECT                                                  [×] │  │
                │  │ Strategic Assessment Required                                           │  │
                │  ├─────────────────────────────────────────────────────────────────────────┤  │
                │  │                                                                         │  │
                │  │  ┌───────────────────────────────────────────────────────────────────┐  │  │
                │  │  │ PROJECT NAME                                                      │  │  │
                │  │  │ [ENTER PROJECT TITLE_________________________________________]    │  │  │
                │  │  └───────────────────────────────────────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │  │
                │  │  │ COST                        │  │ BENEFIT                         │  │  │
                │  │  │ [7 HIGH INVESTMENT      ▼]  │  │ [8 MAJOR IMPACT         ▼]     │  │  │
                │  │  │ Time, effort, resources     │  │ Strategic value gained          │  │  │
                │  │  └─────────────────────────────┘  └─────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │  │
                │  │  │ CATEGORY                    │  │ PRIORITY & STATUS               │  │  │
                │  │  │ ┌───────────┬─────────────┐ │  │ PRIORITY:                       │  │  │
                │  │  │ │   WORK    │    LEARN    │ │  │ [MUST-DO] [SHOULD] [NICE-TO]    │  │  │
                │  │  │ │  Execute  │   Study     │ │  │                                 │  │  │
                │  │  │ ├───────────┼─────────────┤ │  │ STATUS:                         │  │  │
                │  │  │ │   BUILD   │   MANAGE    │ │  │ [FOCUS] [VISIBLE]              │  │  │
                │  │  │ │  Create   │  Organize   │ │  │                                 │  │  │
                │  │  │ └───────────┴─────────────┘ │  │                                 │  │  │
                │  │  └─────────────────────────────┘  └─────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌───────────────────────────────────────────────────────────────────┐  │  │
                │  │  │ CONFIDENCE LEVEL (cost/benefit evaluation)                    │  │  │
                │  │  │ [JCVD] [MAGNA CUM] [GUT FEEL] [LEAP FAITH] [BRITNEY SPEARS]       │  │  │
                │  │  │   1        2          3           4             5                 │  │  │
                │  │  └───────────────────────────────────────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │  │
                │  │  │ TAGS                        │  │ DUE DATE                        │  │  │
                │  │  │ [urgent, client, Q4_______] │  │ [📅 2024-12-31______________]   │  │  │
                │  │  └─────────────────────────────┘  └─────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  │  ┌───────────────────────────────────────────────────────────────────┐  │  │
                │  │  │ DESCRIPTION                                                       │  │  │
                │  │  │ [Detailed project scope and requirements explaining the          │  │  │
                │  │  │  strategic value and implementation approach for this            │  │  │
                │  │  │  initiative...]                                                   │  │  │
                │  │  └───────────────────────────────────────────────────────────────────┘  │  │
                │  │                                                                         │  │
                │  ├─────────────────────────────────────────────────────────────────────────┤  │
                │  │ [CANCEL]                                              [CREATE PROJECT] │  │
                │  └─────────────────────────────────────────────────────────────────────────┘  │
                └───────────────────────────────────────────────────────────────────────────────┘
```

**Modal Specifications:**

**Dimensions & Layout:**
- **Modal Size**: 900px width × 700px height (landscape orientation)
- **Container**: #d1d5db gray with 4px black border and 8px shadow
- **Grid Layout**: Bento-style responsive grid with 24px gaps

**Header Content:**
- **Title**: "CREATE NEW PROJECT" 
- **Subtitle**: "Strategic Assessment Required"
- **Background**: Yellow (#FDE047) with 4px black bottom border

**Form Field Content:**

1. **Project Name** (Full width):
   - Label: "PROJECT NAME"
   - Placeholder: "ENTER PROJECT TITLE"

2. **Cost/Benefit** (50/50 split):
   - **Cost**: Label "COST", Dropdown with 1-10 scale, Guidance: "Time, effort, resources"
   - **Benefit**: Label "BENEFIT", Dropdown with 1-10 scale, Guidance: "Strategic value gained"

3. **Category/Priority** (50/50 split):
   - **Category**: 2×2 grid with options: "WORK", "LEARN", "BUILD", "MANAGE"
   - **Priority**: Three options: "MUST-DO", "SHOULD-DO", "NICE-TO-HAVE"
   - **Status**: Three options: "FOCUS", "VISIBLE",

4. **Confidence Scale** (Full width):
   - Label: "CONFIDENCE LEVEL"
   - Options: "JCVD" (1), "MAGNA CUM" (2), "GUT FEEL" (3), "LEAP FAITH" (4), "BRITNEY SPEARS" (5)

5. **Tags/Date** (50/50 split):
   - **Tags**: Text input with comma-separated values
   - **Due Date**: Date picker input

6. **Description** (Full width):
   - Label: "DESCRIPTION"
   - Textarea for detailed project information (optional field)

**Action Buttons:**
- **Cancel**: Gray background (#9ca3af), white text, 4px black border
- **Create Project**: Yellow background (#FDE047), black text, 4px black border
- Both buttons have 4px shadows and hover animations (translate -2px, -2px)

