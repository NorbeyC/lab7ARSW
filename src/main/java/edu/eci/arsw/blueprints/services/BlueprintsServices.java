/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.filter.types.FilterType;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;

import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {
   
    @Autowired
    @Qualifier("Memory")
    BlueprintsPersistence bpp;

    @Autowired
    @Qualifier("Sub")
    FilterType filter;
    
    /**
     * Add new Blueprint in the class InMemoryBluePrintPersistence
     * @param bp
     * @throws BlueprintPersistenceException
     */
    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        bpp.saveBlueprint(bp);
    }
    
    /**
     * Get the Set of Blueprints
     * @return
     * @throws BlueprintNotFoundException
     * @throws BlueprintPersistenceException
     */
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException, BlueprintPersistenceException {
        return bpp.getBluePrints();
    }
    
    /**
     * the blueprint of the given name created by the given author
     * @param author 
     * @param name 
     * @return 
     * @throws BlueprintNotFoundException 
     */
    public Blueprint getBlueprint(String author,String name) throws BlueprintNotFoundException {
        return bpp.getBlueprint(author, name);
    }
    /**
     * all the blueprints of the given author
     * @param author 
     * @return 
     * @throws BlueprintNotFoundException 
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException, BlueprintPersistenceException{
        return bpp.getBlueprintsByAuthor(author);
    }

    public void applyFilter(Blueprint bp) throws BlueprintNotFoundException{
        filter.filterBlueprint(bp);
    }

    public void applyFilter(Set<Blueprint> bps) throws BlueprintNotFoundException, BlueprintPersistenceException{
        filter.filterBlueprints(bps);
    }

    public void applyFilterByAuthor(Set<Blueprint> blueprints, String author) throws BlueprintNotFoundException{
        filter.filterPrintsByAuthor(author, blueprints);
    }

    public void updateBlueprint(String author, String bpname, List<Point> points) throws BlueprintNotFoundException {
        Blueprint bp = getBlueprint(author, bpname);
        bp.setPoints(points);
    }
    
}
