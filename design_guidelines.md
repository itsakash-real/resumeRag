# ResumeRAG Design Guidelines

## Design Approach
**Selected Approach:** Design System + Reference-Based Hybrid  
**Primary References:** Linear (clean, professional productivity tool) + LinkedIn (professional career platform)  
**Rationale:** This is a professional utility tool for resume analysis and job matching. It requires clarity, trustworthiness, and efficiency over visual flair. The design should feel modern and capable while remaining approachable for hackathon demos.

## Core Design Principles
1. **Professional Clarity:** Clean, uncluttered interfaces that convey competence
2. **Progressive Disclosure:** Information revealed in logical workflow stages
3. **Purposeful Motion:** Subtle animations that guide attention, not distract
4. **Data Emphasis:** Visual hierarchy that highlights extracted skills and job matches

## Color Palette

**Dark Mode (Primary):**
- Background: 222 14% 8% (deep charcoal)
- Surface: 222 14% 12% (elevated panels)
- Border: 222 14% 18% (subtle divisions)
- Primary: 217 91% 60% (trustworthy blue)
- Primary Hover: 217 91% 65%
- Success: 142 76% 45% (skill tags)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 220 13% 91%
- Primary: 217 91% 52%
- Text Primary: 222 14% 12%

**Accent Colors:**
- Skill Tag: 142 76% 45% (green) with 142 76% 96% background
- Job Match High: 217 91% 60% (blue)
- Warning: 38 92% 50% (upload states)

## Typography

**Font Stack:**
- Primary: Inter (Google Fonts) - clean, professional, excellent legibility
- Monospace: 'Fira Code' (for extracted data display)

**Scale:**
- Hero Headline: text-5xl font-bold tracking-tight (48px)
- Page Title: text-3xl font-semibold (30px)
- Section Header: text-xl font-semibold (20px)
- Body: text-base (16px)
- Caption: text-sm text-secondary (14px)
- Job Card Title: text-lg font-medium (18px)

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: space-y-6 or space-y-8
- Card gaps: gap-4 or gap-6
- Page margins: px-6 md:px-12 lg:px-24

**Container Strategy:**
- Homepage: Full-width hero, max-w-6xl for content
- Dashboard: max-w-7xl with internal grid system
- Forms: max-w-md for login, max-w-2xl for upload areas

**Grid System:**
- Job listings: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
- Dashboard sections: Single column stacking on mobile, strategic multi-column on desktop

## Component Library

**Navigation Bar:**
- Fixed top, backdrop-blur-lg with bg-background/80
- Logo left, navigation center, user menu right
- Height: h-16, border-b border-border

**Cards:**
- Job cards: Elevated surface (bg-surface) with rounded-xl, p-6, border border-border
- Hover: subtle scale (hover:scale-[1.02]) with shadow transition
- Skill tags: Inline-flex items-center with rounded-full px-3 py-1

**Buttons:**
- Primary: bg-primary hover:bg-primary-hover, rounded-lg, px-6 py-3
- Secondary: border-2 border-border hover:bg-surface
- CTA buttons: Add subtle shadow and scale on hover

**Upload Zone:**
- Dashed border (border-2 border-dashed) in neutral color
- Large drop target: min-h-64 with centered content
- Active state: border-primary bg-primary/5
- Progress bar: Linear gradient, rounded-full, h-2

**Forms:**
- Input fields: bg-surface border border-border rounded-lg px-4 py-3
- Focus state: ring-2 ring-primary/50
- Labels: text-sm font-medium mb-2

**Skill Tags:**
- Pill-shaped: rounded-full px-3 py-1.5
- Green theme: bg-success/10 text-success border border-success/20
- Display in flex-wrap gap-2

**Job Cards:**
- Title + Company in header
- Location + Salary in metadata row
- Match score badge (if applicable): rounded-full absolute top-4 right-4
- Apply button: Primary style, full-width or float right

## Animation Strategy

**Page Transitions:**
- Fade-in on mount: opacity-0 to opacity-100, duration-500
- Stagger children by 100ms for lists

**Micro-interactions:**
- Button hover: scale-[1.02] + shadow, duration-200
- Card hover: scale-[1.02], duration-300
- Upload zone: pulse animation when dragging file over

**Progress Indicators:**
- Upload progress: Smooth width transition with gradient
- Loading states: Skeleton screens with shimmer effect (linear-gradient animation)

**Avoid:**
- Complex scroll-triggered animations
- Excessive parallax effects
- Distracting background animations

## Page-Specific Guidelines

**Homepage:**
- Hero: 80vh height, centered content with gradient text headline
- Background: Subtle grid pattern overlay on dark background
- CTA: Large primary button (px-8 py-4) with arrow icon
- Minimal: 2-3 sections maximum (Hero + Features + CTA)

**Login Page:**
- Centered card: max-w-md, elevated surface
- Simple form layout with consistent spacing (space-y-4)
- Demo credentials displayed subtly below form
- Background: Matching homepage aesthetic

**Dashboard:**
- Three-stage workflow visualization at top (Upload → Extract → Match)
- Vertical flow on mobile, potential multi-column on large screens
- Upload section: Prominent at top when empty
- Skills display: Horizontal scrolling tag row or flex-wrap
- Job results: Grid layout with filters/sort on left (desktop only)

## Images

**Hero Section (Homepage):**
- Large abstract visualization representing AI/resume matching
- Placement: Right side of hero on desktop (50/50 split), background on mobile
- Style: Modern illustration or gradient mesh showing document → skills → jobs flow
- Alt approach: No image, focus on bold typography and gradient effects

**Dashboard:**
- Icon illustrations for empty states (no CV uploaded, no jobs found)
- Small decorative accents only, keep data-focused

## Accessibility & Polish

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Focus indicators on all interactive elements (ring-2 ring-primary)
- Keyboard navigation support
- Loading states for all async operations
- Error states with clear messaging
- Consistent dark mode throughout (no white flashes)

## Key Differentiators

- **Data Visualization:** Skills displayed as interactive, colorful tags rather than plain lists
- **Professional Tone:** LinkedIn-inspired professionalism, not playful startup aesthetic
- **Workflow Clarity:** Clear visual progression through upload → extract → match stages
- **Subtle Premium Feel:** Elevated surfaces, soft shadows, precise spacing convey quality despite hackathon timeline