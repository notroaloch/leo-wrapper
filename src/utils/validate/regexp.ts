import LeoError from '../../models/LeoError';

const ACADEMIC_TERM_REGEXP = new RegExp('^\\d{4}-[A-Z]$');
const CAMPUS_ID_REGEXP = new RegExp('^[ABCDEFGHIJKLMNTUXZ34]$');
const CAMPUS_SEMS_ID_REGEXP = new RegExp('^\\d{3}$');

export const validateAcademicTerm = (academicTerm: string) => {
  if (!ACADEMIC_TERM_REGEXP.test(academicTerm)) {
    throw new LeoError(new Error('Invalid format for academicTerm'));
  }
  return true;
};

export const validateCampusID = (campusID: string) => {
  if (!CAMPUS_ID_REGEXP.test(campusID)) {
    throw new LeoError(new Error('Invalid campusID'));
  }
  return true;
};

export const validateCampusSEMSID = (campusID: string) => {
  if (!CAMPUS_SEMS_ID_REGEXP.test(campusID)) {
    throw new LeoError(new Error('Invalid campusID'));
  }
  return true;
};
