package dreamcraft.workhub.config;

import dreamcraft.workhub.web.WorkhubLoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {
    @Autowired private DataSource dataSource;
    @Autowired private BCryptPasswordEncoder passwordEncoder;
    @Autowired private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
    @Value("${db.queries.users-query}") private String usersQuery;
    @Value("${db.queries.roles-query}") private String rolesQuery;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
            .dataSource(dataSource)
            .passwordEncoder(passwordEncoder)
            .usersByUsernameQuery(usersQuery)
            .authoritiesByUsernameQuery(rolesQuery);
    }

    @Override
    public void configure(WebSecurity web) throws Exception { // ignore static assets
        web.ignoring().antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/clients/**", "/projects/**", "/documents/**").authenticated()
            .anyRequest().permitAll()
            .and()
            .csrf() // disable cross site request forgery
                .disable()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthenticationEntryPoint)
            .and()
            .formLogin()
                .successHandler(loginSuccessHandler()) // returns http 200
                .failureHandler(loginFailureHandler()) // returns http 401
            .and()
            .logout()
                .logoutUrl("/logout") // url for triggering log out
                .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler()) // returns http 200 code by default
                .invalidateHttpSession(true); // destroy session
    }

    @Bean
    public WorkhubLoginSuccessHandler loginSuccessHandler() {
        return new WorkhubLoginSuccessHandler();
    }

    @Bean
    public SimpleUrlAuthenticationFailureHandler loginFailureHandler() {
        return new SimpleUrlAuthenticationFailureHandler();
    }
}
