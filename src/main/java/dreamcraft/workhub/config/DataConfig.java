package dreamcraft.workhub.config;

import com.mysql.cj.jdbc.MysqlDataSource;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories("dreamcraft.workhub.dao")
@PropertySource("classpath:application.properties")
public class DataConfig {
    @Autowired private Environment env;

//    @Bean
//    public LocalSessionFactoryBean createSessionFactory() {
//        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
//        sessionFactory.setDataSource(createDataSource());
//        sessionFactory.setPackagesToScan("dreamcraft.workhub.model");
//        sessionFactory.setHibernateProperties(getHibernateProperties());
//        return sessionFactory;
//    }

    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean createEntityManager() {
        LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();
        entityManager.setDataSource(createDataSource());
        entityManager.setPackagesToScan(env.getProperty("entityManager.packagesToScan"));
        entityManager.setPersistenceProviderClass(HibernatePersistenceProvider.class);
        entityManager.setJpaProperties(getHibernateProperties());
        return entityManager;
    }

    @Bean
    public DataSource createDataSource() {
        MysqlDataSource dataSource = new MysqlDataSource();
        dataSource.setUrl(env.getProperty("db.url")); // contains database name, otherwise set via .setDatabaseName()
        dataSource.setUser(env.getProperty("db.username"));
        dataSource.setPassword(env.getProperty("db.password"));
        return dataSource;
    }

    @Bean(name = "transactionManager")
    public PlatformTransactionManager createTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(createEntityManager().getObject());
        return transactionManager;
    }

    @Bean
    public Properties getHibernateProperties() {
        Properties hibernateProperties = new Properties();
        hibernateProperties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", env.getProperty("hibernate.ddl-auto"));
        hibernateProperties.setProperty("hibernate.show_sql", env.getProperty("hibernate.showSQL"));
        return hibernateProperties;
    }
}
