-- =============================================================
-- Dayflow HRMS -- Supplemental SQL Constraints
-- Apply AFTER running: npx prisma migrate dev --name init
--
-- These constraints cannot be expressed natively in Prisma PSL
-- and must be applied via a separate migration or raw SQL.
-- =============================================================

-- 1. Partial unique index on salary_structures:
--    At most one isCurrent=true row per employee.
CREATE UNIQUE INDEX IF NOT EXISTS uidx_salary_structures_employee_current
  ON salary_structures (employee_id)
  WHERE (is_current = TRUE);

-- 2. Composite unique on holidays:
--    (holiday_date, applies_to, department_id)
--    The ERD specifies this constraint; department_id can be NULL.
CREATE UNIQUE INDEX IF NOT EXISTS uidx_holidays_date_scope
  ON holidays (holiday_date, applies_to, COALESCE(department_id, -1));

-- 3. Prevent check_in_at > check_out_at on attendance
ALTER TABLE attendance
  ADD CONSTRAINT chk_attendance_checkout_after_checkin
  CHECK (check_out_at IS NULL OR check_in_at IS NULL OR check_out_at > check_in_at);

-- 4. Ensure leave_request end_date >= start_date
ALTER TABLE leave_requests
  ADD CONSTRAINT chk_leave_request_dates
  CHECK (end_date >= start_date);

-- 5. Ensure employment_history effective_to >= effective_from
ALTER TABLE employment_history
  ADD CONSTRAINT chk_emp_history_dates
  CHECK (effective_to IS NULL OR effective_to >= effective_from);

-- 6. Ensure salary_structures effective_to >= effective_from
ALTER TABLE salary_structures
  ADD CONSTRAINT chk_salary_structure_dates
  CHECK (effective_to IS NULL OR effective_to >= effective_from);

-- 7. Ensure payroll period values are valid
ALTER TABLE payroll_runs
  ADD CONSTRAINT chk_payroll_run_month CHECK (period_month BETWEEN 1 AND 12),
  ADD CONSTRAINT chk_payroll_run_year  CHECK (period_year  BETWEEN 2000 AND 2100);

ALTER TABLE payslips
  ADD CONSTRAINT chk_payslip_month CHECK (period_month BETWEEN 1 AND 12),
  ADD CONSTRAINT chk_payslip_year  CHECK (period_year  BETWEEN 2000 AND 2100);

-- 8. Ensure day_count is 0.5 or 1.0 in leave_request_days
ALTER TABLE leave_request_days
  ADD CONSTRAINT chk_leave_request_day_count
  CHECK (day_count IN (0.5, 1.0));