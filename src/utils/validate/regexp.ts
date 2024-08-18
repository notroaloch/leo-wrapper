const ACADEMIC_TERM_REGEXP = new RegExp('^\\d{4}-[A-Z]$');
const CAMPUS_ID_REGEXP = new RegExp('^[ABCDEFGHIJKLMNTUXZ34]$');
const CAMPUS_SEMS_ID_REGEXP = new RegExp('^\\d{3}$');

export const validateAcademicTerm = (academicTerm: string | undefined) => {
  if (!academicTerm) return false;
  if (!ACADEMIC_TERM_REGEXP.test(academicTerm)) return false;

  return true;
};

export const validateCampusID = (campusID: string | undefined) => {
  if (!campusID) return false;
  if (!CAMPUS_ID_REGEXP.test(campusID)) return false;

  return true;
};

export const validateCampusSEMSID = (campusID: string | undefined) => {
  if (!campusID) return false;
  if (!CAMPUS_SEMS_ID_REGEXP.test(campusID)) return false;

  return true;
};
