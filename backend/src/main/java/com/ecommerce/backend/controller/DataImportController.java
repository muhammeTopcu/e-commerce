package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.importer.ImportResultDto;
import com.ecommerce.backend.service.DataImportService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal")
public class DataImportController {

    private final DataImportService dataImportService;

    public DataImportController(DataImportService dataImportService) {
        this.dataImportService = dataImportService;
    }

    @PostMapping("/import")
    public ImportResultDto importData(@RequestParam(defaultValue = "false") boolean force) {
        return dataImportService.importFromLegacyApi(force);
    }
}
