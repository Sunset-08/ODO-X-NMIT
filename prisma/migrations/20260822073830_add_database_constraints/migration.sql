CREATE UNIQUE INDEX IF NOT EXISTS uidx_salary_structures_employee_current
  ON salary_structures (employee_id)
  WHERE (is_current = TRUE);

CREATE UNIQUE INDEX IF NOT EXISTS uidx_holidays_date_scope
  ON holidays (holiday_date, applies_to, COALESCE(department_id, -1));

ALTER TABLE attendance
  ADD CONSTRAINT chk_attendance_checkout_after_checkin
  CHECK (check_out_at IS NULL OR check_in_at IS NULL OR check_out_at > check_in_at);

ALTER TABLE leave_requests
  ADD CONSTRAINT chk_leave_request_dates
  CHECK (end_date >= start_date);

ALTER TABLE employment_history
  ADD CONSTRAINT chk_emp_history_dates
  CHECK (effective_to IS NULL OR effective_to >= effective_from);

ALTER TABLE salary_structures
  ADD CONSTRAINT chk_salary_structure_dates
  CHECK (effective_to IS NULL OR effective_to >= effective_from);

ALTER TABLE payroll_runs
  ADD CONSTRAINT chk_payroll_run_month CHECK (period_month BETWEEN 1 AND 12),
  ADD CONSTRAINT chk_payroll_run_year CHECK (period_year BETWEEN 2000 AND 2100);

ALTER TABLE payslips
  ADD CONSTRAINT chk_payslip_month CHECK (period_month BETWEEN 1 AND 12),
  ADD CONSTRAINT chk_payslip_year CHECK (period_year BETWEEN 2000 AND 2100);

ALTER TABLE leave_request_days
  ADD CONSTRAINT chk_leave_request_day_count
  CHECK (day_count IN (0.5, 1.0));