const MOBILE_REG = /\d{11}/
const GIT_REMOTE_REG = /^(git@)?(http(s)?:\/\/)?([:.a-zA-Z/])+.git$/
function verifyMobile(mobile: string): boolean {
  return MOBILE_REG.test(mobile.trim());
}

function verifyGitRemote(remote: string): boolean {
  return GIT_REMOTE_REG.test(remote);
}

const VerifyUtils = {
  MOBILE_REG,
  GIT_REMOTE_REG,
  verifyMobile,
  verifyGitRemote,
};

export default VerifyUtils;
