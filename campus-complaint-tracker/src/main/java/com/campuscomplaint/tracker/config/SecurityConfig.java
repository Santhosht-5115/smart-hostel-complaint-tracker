package com.campuscomplaint.tracker.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.campuscomplaint.tracker.service.CustomUserDetailsService;

@Configuration
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // 1. Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Authentication Manager
    @Bean
    public AuthenticationManager authenticationManager() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);

        provider.setPasswordEncoder(passwordEncoder());

        return new ProviderManager(provider);
    }

    // 3. Security Context Repository
    @Bean
    public SecurityContextRepository securityContextRepository() {

        return new HttpSessionSecurityContextRepository();
    }

    // 4. CORS Configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        String frontendUrl = System.getenv()
                .getOrDefault("FRONTEND_URL", "http://localhost:5173");

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(frontendUrl));

        configuration.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
    // 5. Security Filter Chain
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            AuthenticationManager authenticationManager,
            SecurityContextRepository securityContextRepository)
            throws Exception {

        http
            // CSRF configuration
            .csrf(csrf -> csrf.disable())

            // CORS configuration
            .cors(cors ->
                    cors.configurationSource(corsConfigurationSource())
            )

            // Security context configuration
            .securityContext(context ->
                    context.securityContextRepository(
                            securityContextRepository
                    )
            )

            // Session configuration
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.IF_REQUIRED
                    )
            )

            // Authentication Manager
            .authenticationManager(authenticationManager)

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                    // Public authentication endpoints
                    .requestMatchers(
                            HttpMethod.POST,
                            "/api/auth/register",
                            "/api/auth/login"
                    ).permitAll()

                    // Admin-only endpoints
                    .requestMatchers("/api/admin/dashboard/**")
                    .hasRole("ADMIN")

                    // Staff-only endpoints
                    .requestMatchers("/api/staff/**")
                    .hasRole("STAFF")

                    // All other endpoints require authentication
                    .anyRequest().authenticated()
            )

            // HTTP Basic authentication
            .httpBasic(basic -> {});

        return http.build();
    }
}