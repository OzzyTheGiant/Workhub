package dreamcraft.workhub.web;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WorkhubLoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private RequestCache requestCache = new HttpSessionRequestCache();

    @Override
    public void onAuthenticationSuccess( // removes redirect logic and helps output status code 200 after successfull login
    HttpServletRequest request,
    HttpServletResponse response,
    Authentication authentication) throws ServletException {
        SavedRequest savedRequest = requestCache.getRequest(request, response);
        if (savedRequest == null) {
            clearAuthenticationAttributes(request);
            return;
        }
        String targetUrlParam = getTargetUrlParameter();
        if (isAlwaysUseDefaultTargetUrl() ||
            (targetUrlParam != null) && StringUtils.hasText(request.getParameter(targetUrlParam))) {
            return;
        }
        request.getSession().setMaxInactiveInterval(28800);
        clearAuthenticationAttributes(request);
    }

    public void setRequestCache(RequestCache cache) {
        requestCache = cache;
    }
}
