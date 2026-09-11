const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'Navbar.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update the close button to reset showPortfolioNotice
content = content.replace(
  `onClick={() => setIsAuthModalOpen(false)} className="text-neutral-400 hover:text-brand-black transition-colors" type="button"`,
  `onClick={() => { setIsAuthModalOpen(false); setShowPortfolioNotice(false); }} className="text-neutral-400 hover:text-brand-black transition-colors" type="button"`
);

content = content.replace(
  `onClick={() => setIsAuthModalOpen(false)}`,
  `onClick={() => { setIsAuthModalOpen(false); setShowPortfolioNotice(false); }}`
);


// 2. Replace the Modal Body with the conditional rendering
const modalBodyTargetStart = `{/* Modal Body */}`;
const modalBodyTargetEnd = `</div>\n          </div>\n        </div>`;

const startIndex = content.indexOf(modalBodyTargetStart);
const endIndex = content.indexOf(modalBodyTargetEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newModalBody = `{/* Modal Body */}
            <div className="p-6 flex flex-col gap-4">
              
              {showPortfolioNotice ? (
                <div className="flex flex-col items-center text-center py-4">
                  <span className="material-symbols-outlined text-[48px] text-brand-black mb-4">info</span>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-brand-black mb-2">Portfolio Notice</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    This is a portfolio showcase website. In a live production environment, this would integrate with Google OAuth and a secure backend authentication service to sign you into your account.
                  </p>
                  <button onClick={() => setShowPortfolioNotice(false)} className="mt-6 font-bold text-xs uppercase tracking-wider text-brand-black hover:underline" type="button">
                    Go Back
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                    <input type="email" placeholder="Enter your email ID" className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Password</label>
                      {authMode === 'signin' && (
                        <button className="text-[10px] uppercase font-bold text-brand-black hover:underline" type="button">Forgot Password?</button>
                      )}
                    </div>
                    <input type="password" placeholder="Enter your password" className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-brand-black transition-colors" />
                  </div>

                  <button onClick={() => setShowPortfolioNotice(true)} className="w-full bg-brand-black text-white font-bold text-sm uppercase tracking-wider py-3.5 mt-2 hover:bg-neutral-800 transition-colors" type="button">
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>

                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative bg-white px-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Or</div>
                  </div>

                  <button onClick={() => setShowPortfolioNotice(true)} className="w-full border border-neutral-300 bg-white text-brand-black font-bold text-sm tracking-wide py-3.5 flex items-center justify-center gap-3 hover:bg-neutral-50 transition-colors" type="button">
                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.369 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.109 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
                    Continue with Google
                  </button>
                  
                  <div className="text-center mt-4 text-xs text-neutral-500">
                    {authMode === 'signin' ? (
                      <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="font-bold text-brand-black hover:underline uppercase ml-1" type="button">Create One</button></p>
                    ) : (
                      <p>Already have an account? <button onClick={() => setAuthMode('signin')} className="font-bold text-brand-black hover:underline uppercase ml-1" type="button">Sign In</button></p>
                    )}
                  </div>
                </>
              )}

            </div>
`;

  content = content.substring(0, startIndex) + newModalBody + content.substring(endIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Navbar auth modal updated with portfolio notice.");
} else {
  console.log("Could not find modal body boundaries.");
}
