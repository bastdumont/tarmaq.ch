# Airtable Schema Design for TARMAQ Website

## Overview
This document outlines the complete database schema for the TARMAQ website's Airtable backend integration. The schema supports:
- Dynamic content display
- KPI tracking and analytics
- Donation processing and tracking
- Course automation from YouTube
- Travel abroad opportunities and applications

---

## Table Structure

### 1. Courses Table
**Purpose**: Store academy courses (manual + auto-generated from YouTube)

| Field Name | Type | Description | Options/Notes |
|------------|------|-------------|---------------|
| `id` | Auto-number | Unique identifier | Primary key |
| `title` | Single line text | Course title | Multilingual support |
| `description` | Long text | Course description | Multilingual support |
| `video_url` | URL | YouTube video URL | Required |
| `thumbnail` | Attachment | Course thumbnail image | Generated from YouTube |
| `category` | Single select | Course category | AI, Marketing, Trading, Development, etc. |
| `status` | Single select | Publication status | Draft, Pending, Published, Archived |
| `created_date` | Date | Creation timestamp | Auto-generated |
| `last_updated` | Date | Last modification | Auto-updated |
| `approval_status` | Single select | Quality assurance | Pending Review, Approved, Rejected |
| `reviewer_notes` | Long text | Manual review feedback | Optional |
| `source` | Single select | How course was created | Manual, YouTube Auto |
| `playlist_id` | Single line text | YouTube playlist reference | For automation |
| `language` | Single select | Primary language | fr, en, de, it |
| `view_count` | Number | Total views | Auto-calculated |
| `rating` | Number | Average rating (1-5) | Calculated |

---

### 2. Opportunities Table
**Purpose**: Manage travel abroad opportunities and programs

| Field Name | Type | Description | Options/Notes |
|------------|------|-------------|---------------|
| `id` | Auto-number | Unique identifier | Primary key |
| `title` | Single line text | Program title | Multilingual support |
| `description` | Long text | Full program details | Multilingual support |
| `country` | Single line text | Destination country | Filter option |
| `city` | Single line text | Destination city | Filter option |
| `start_date` | Date | Program start date | Required |
| `end_date` | Date | Program end date | Required |
| `application_deadline` | Date | Last day to apply | Required |
| `eligibility` | Long text | Requirements | Multilingual support |
| `requirements` | Multiple select | Required documents/criteria | CV, Portfolio, References, etc. |
| `capacity` | Number | Maximum participants | Required |
| `current_applications` | Formula | Count of applications | Auto-calculated |
| `available_spots` | Formula | Capacity - Applications | Auto-calculated |
| `status` | Single select | Opportunity status | Open, Closed, In Progress, Completed |
| `type` | Single select | Opportunity type | Exchange, Internship, Bootcamp, Conference |
| `duration` | Single line text | Program duration | "2 weeks", "3 months", etc. |
| `cost_info` | Long text | Financial information | Scholarship info, costs |
| `contact_person` | Single line text | Program coordinator | Name |
| `contact_email` | Email | Contact email | Required |
| `application_link` | URL | HubSpot booking link | For interviews |
| `created_date` | Date | Creation timestamp | Auto-generated |

---

### 3. Applications Table
**Purpose**: Track applications for travel abroad opportunities

| Field Name | Type | Description | Options/Notes |
|------------|------|-------------|---------------|
| `id` | Auto-number | Unique identifier | Primary key |
| `applicant_name` | Single line text | Full name | Required |
| `email` | Email | Contact email | Required |
| `phone` | Phone | Contact phone | Optional |
| `opportunity_id` | Link to Opportunities | Opportunity applied for | Required |
| `application_date` | Date | Date of application | Auto-generated |
| `motivation` | Long text | Why they want to participate | Required |
| `cv_url` | Attachment | Uploaded CV/Resume | Required |
| `portfolio_url` | Attachment | Portfolio (if applicable) | Optional |
| `references` | Long text | Reference contacts | Optional |
| `status` | Single select | Application status | Submitted, Under Review, Accepted, Rejected, Withdrawn |
| `review_notes` | Long text | Internal review notes | Admin only |
| `meeting_booked` | Checkbox | Interview scheduled | Linked to HubSpot |
| `meeting_date` | Date | Interview date/time | Optional |
| `decision_date` | Date | Final decision date | Optional |
| `follow_up_email_sent` | Checkbox | Notification sent | Auto-track |

---

### 4. Donations Table
**Purpose**: Track all donations and donor information

| Field Name | Type | Description | Options/Notes |
|------------|------|-------------|---------------|
| `id` | Auto-number | Unique identifier | Primary key |
| `donor_name` | Single line text | Donor's name | Required (unless anonymous) |
| `email` | Email | Donor email | Required |
| `amount` | Currency | Donation amount | CHF, EUR, USD |
| `currency` | Single select | Currency type | CHF, EUR, USD |
| `amount_chf` | Formula | Converted to CHF | Auto-calculated |
| `donation_date` | Date | Transaction date | Auto-generated |
| `anonymous` | Checkbox | Show on leaderboard? | Default: No |
| `display_name` | Formula | Public name or "Anonymous" | For leaderboard |
| `message` | Long text | Optional public message | Public on leaderboard |
| `payment_method` | Single select | Payment method | Stripe, PayPal, Bank Transfer |
| `transaction_id` | Single line text | Payment processor ID | For records |
| `receipt_sent` | Checkbox | Email receipt sent | Auto-track |
| `tax_deductible` | Checkbox | Tax deduction eligible | Switzerland/regional |
| `category` | Single select | Donation purpose | General, Scholarship, Equipment, Program |
| `notes` | Long text | Internal notes | Admin only |

---

### 5. KPIs Table
**Purpose**: Store key performance indicators and metrics

| Field Name | Type | Description | Options/Notes |
|------------|------|-------------|---------------|
| `id` | Auto-number | Unique identifier | Primary key |
| `metric_name` | Single line text | KPI name | "Active Participants", "Completed Projects", etc. |
| `category` | Single select | Metric category | Community, Programs, Impact, Engagement |
| `value` | Number | Current value | Auto-updated |
| `target` | Number | Target value | For progress tracking |
| `unit` | Single line text | Unit of measurement | "people", "projects", "CHF", "%" |
| `period` | Single select | Time period | Daily, Weekly, Monthly, Quarterly, Yearly, All-time |
| `date` | Date | Measurement date | Auto-generated |
| `trend` | Single select | Direction of change | Up, Down, Stable |
| `percentage_change` | Formula | % change from previous | Auto-calculated |
| `display_order` | Number | Dashboard order | 1, 2, 3... |
| `visible` | Checkbox | Show on public dashboard? | Default: Yes |
| `updated_date` | Date | Last update | Auto-updated |

---

### 6. Program Participants Table
**Purpose**: Track participants in various programs

| Field Name | Type | Description | Options/Notes |
|------------|------|-------------|---------------|
| `id` | Auto-number | Unique identifier | Primary key |
| `participant_name` | Single line text | Full name | Required |
| `email` | Email | Contact email | Required |
| `phone` | Phone | Contact phone | Optional |
| `program_type` | Single select | Program joined | Training, Hackathon, Bootcamp, Mentoring, Exchange |
| `start_date` | Date | Program start | Required |
| `completion_date` | Date | Program completion | Optional |
| `status` | Single select | Current status | Active, Completed, Dropped, On Hold |
| `outcome` | Long text | Program outcome/feedback | Optional |
| `testimonials` | Long text | Public testimonial | For impact page |
| `testimonial_approved` | Checkbox | Can publish testimonial? | Default: No |
| `social_media_link` | URL | LinkedIn/Twitter | Optional |
| `mentor_name` | Single line text | Assigned mentor | If applicable |

---

### 7. Mentors Table
**Purpose**: Manage mentor network

| Field Name | Type | Description | Options/Notes |
|------------|------|-------------|---------------|
| `id` | Auto-number | Unique identifier | Primary key |
| `mentor_name` | Single line text | Full name | Required |
| `email` | Email | Contact email | Required |
| `company` | Single line text | Current employer | Optional |
| `title` | Single line text | Job title | Optional |
| `expertise` | Multiple select | Areas of expertise | AI, Marketing, Development, Business, etc. |
| `availability` | Single select | Time commitment | 2h/month, 4h/month, On-demand |
| `status` | Single select | Current status | Active, Inactive, New |
| `mentees_count` | Formula | Number of active mentees | Auto-calculated |
| `hours_contributed` | Number | Total hours volunteered | Auto-tracked |
| `start_date` | Date | Joined as mentor | Required |
| `bio` | Long text | Professional background | For website |

---

## Relationships

### Links Between Tables
1. **Applications → Opportunities**: Many-to-One (Many applications per opportunity)
2. **Applications → Donations**: No direct link (separate entities)
3. **Participants → Programs**: Tracked via `program_type` field
4. **Participants → Mentors**: Tracked via `mentor_name` field

---

## Views for Dashboard

### 1. KPI Dashboard View
- Filter: `visible` = Yes
- Sort by: `display_order`
- Group by: `category`

### 2. Active Donations View
- Filter: `donation_date` = Last 90 days
- Sort by: `amount_chf` descending

### 3. Open Opportunities View
- Filter: `status` = Open AND `application_deadline` ≥ Today
- Sort by: `application_deadline`

### 4. Pending Courses View
- Filter: `approval_status` = Pending Review AND `source` = YouTube Auto
- Sort by: `created_date` descending

### 5. Recent Applications View
- Filter: `status` = Under Review
- Sort by: `application_date` descending

---

## Automation Triggers

### 1. New Course from YouTube
- **Trigger**: Video added to monitored playlist
- **Action**: Create new record in Courses table
- **Status**: Set to "Pending Review"

### 2. Application Submitted
- **Trigger**: New application record created
- **Action**: 
  - Send confirmation email to applicant
  - Update opportunity `current_applications` count
  - Notify admin

### 3. Donation Received
- **Trigger**: New donation record created
- **Action**:
  - Update funding progress (calculated field)
  - Send thank-you email with receipt
  - Update leaderboard if not anonymous

### 4. KPI Update
- **Trigger**: Manual or scheduled update
- **Action**: Recalculate formulas and update dashboard

---

## Security & Permissions

### API Access
- **Read-Only**: Dashboard display (public data only)
- **Read-Write**: Admin operations (private)
- **Write-Only**: Donation submissions (API key secured)

### Environment Variables Required
```bash
AIRTABLE_API_KEY=<your_api_key>
AIRTABLE_BASE_ID=<your_base_id>
AIRTABLE_BASE_URL=https://api.airtable.com/v0
```

---

## Implementation Priority

### Phase 1: Core Tables (Week 1-2)
1. Courses table
2. KPIs table
3. Donations table

### Phase 2: Applications (Week 3-4)
4. Opportunities table
5. Applications table

### Phase 3: Community (Week 5-6)
6. Program Participants table
7. Mentors table

---

## Data Migration Strategy

### Initial Data Population
1. **Courses**: Manual entry of existing academy content
2. **KPIs**: Set up baseline metrics
3. **Donations**: Import historical data (if available)
4. **Opportunities**: Create 3-5 pilot opportunities
5. **Applications**: Start fresh (no migration needed)
6. **Participants/Mentors**: Manual entry of current database

---

## Notes & Considerations

1. **Multilingual Support**: Use separate fields or encoding for each language
2. **Performance**: Implement caching for frequently accessed data
3. **Rate Limits**: Airtable API = 5 requests/second (plan batch operations)
4. **File Attachments**: PDF uploads for CVs/portfolios (Airtable handles storage)
5. **Backup Strategy**: Export tables monthly to JSON backup

---

**Schema Version**: 1.0  
**Created**: 2025-01-23  
**Last Updated**: 2025-01-23  
**Author**: TARMAQ Development Team

