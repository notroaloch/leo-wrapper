import LeoError from '../../models/LeoError';

const ACADEMIC_TERM_REGEXP = new RegExp('^\\d{4}-[A-Z]$');
const CAREER_PROGRAM_ID_REGEXP = new RegExp('[A-Z]{3,4}');

export const validateCareerProgramID = (careerProgramID: string) => {
  if (!CAREER_PROGRAM_ID_REGEXP.test(careerProgramID)) {
    throw new LeoError(new Error('Invalid format for careerProgramID'));
  }
  return true;
};

export const validateAcademicTerm = (academicTerm: string) => {
  if (!ACADEMIC_TERM_REGEXP.test(academicTerm)) {
    throw new LeoError(new Error('Invalid format for academicTerm'));
  }
  return true;
};
