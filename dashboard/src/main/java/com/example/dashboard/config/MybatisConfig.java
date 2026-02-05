package com.example.dashboard.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource; // 중요: jakarta.annotation.Resource 아님!
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;

@Configuration
@MapperScan("com.example.dashboard.mapper") // 인터페이스를 빈으로 등록해주는 핵심 설정
public class MybatisConfig {

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);

        // 1. Mapper XML 위치 설정
        Resource[] mapperLocations = new PathMatchingResourcePatternResolver()
                .getResources("classpath:mapper/*.xml");
        sqlSessionFactoryBean.setMapperLocations(mapperLocations); // 이 줄이 반드시 있어야 합니다!

        // 2. (선택사항) 만약 mybatis-config.xml도 쓰고 싶다면 추가
        // sqlSessionFactoryBean.setConfigLocation(new ClassPathResource("mybatis-config.xml"));

        return sqlSessionFactoryBean.getObject();
    }

    /**
     * SqlSessionTemplate 빈 생성
     * : MyBatis의 SqlSession 구현 및 스프링 트랜잭션 설정과의 통합을 용이하게 함
     * : SqlSession의 스레드 안전한 공유 인스턴스를 제공하여, SQL 작업 실행 및 트랜잭션 관리를 단순화
     *
     * @param sqlSessionFactory SqlSessionFactory 객체
     * @return SqlSessionTemplate 인스턴스
     */
    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
